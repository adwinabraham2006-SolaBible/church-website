"""
YouTube Channel Video Exporter
Exports all videos from a YouTube channel to a CSV file.

Requirements:
    pip install requests

Usage:
    python export_sermons_youtube.py --api-key YOUR_API_KEY
"""

import csv
import argparse
import sys
from datetime import datetime
import requests

CHANNEL_HANDLE = "@solabiblechurch"
OUTPUT_FILE = "sola_bible_videos.csv"
YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"


def get_channel_id(api_key: str, handle: str) -> str:
    """Resolve a @handle to a channel ID."""
    resp = requests.get(
        f"{YOUTUBE_API_BASE}/channels",
        params={
            "part": "id",
            "forHandle": handle.lstrip("@"),
            "key": api_key,
        },
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    items = data.get("items", [])
    if not items:
        sys.exit(f"Error: No channel found for handle '{handle}'. Double-check the handle and your API key.")
    return items[0]["id"]


def get_uploads_playlist_id(api_key: str, channel_id: str) -> str:
    """Get the 'uploads' playlist ID for a channel (contains every public video)."""
    resp = requests.get(
        f"{YOUTUBE_API_BASE}/channels",
        params={
            "part": "contentDetails",
            "id": channel_id,
            "key": api_key,
        },
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    return data["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]


def fetch_all_videos(api_key: str, playlist_id: str) -> list[dict]:
    """Page through the uploads playlist and collect every video."""
    videos = []
    next_page_token = None

    while True:
        params = {
            "part": "snippet",
            "playlistId": playlist_id,
            "maxResults": 50,  # max allowed per request
            "key": api_key,
        }
        if next_page_token:
            params["pageToken"] = next_page_token

        resp = requests.get(
            f"{YOUTUBE_API_BASE}/playlistItems",
            params=params,
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()

        for item in data.get("items", []):
            snippet = item["snippet"]
            video_id = snippet["resourceId"]["videoId"]
            published_raw = snippet.get("publishedAt", "")

            # Format publish date as YYYY-MM-DD
            try:
                published = datetime.fromisoformat(published_raw.replace("Z", "+00:00")).strftime("%Y-%m-%d")
            except (ValueError, AttributeError):
                published = published_raw

            videos.append({
                "Title": snippet.get("title", ""),
                "Publish Date": published,
                "YouTube URL": f"https://www.youtube.com/watch?v={video_id}",
            })

        next_page_token = data.get("nextPageToken")
        if not next_page_token:
            break

    return videos


def write_csv(videos: list[dict], output_file: str) -> None:
    fieldnames = ["Title", "Publish Date", "YouTube URL"]
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(videos)


def main():
    parser = argparse.ArgumentParser(description="Export YouTube channel videos to CSV.")
    parser.add_argument("--api-key", required=True, help="Your YouTube Data API v3 key")
    args = parser.parse_args()

    print(f"Looking up channel: {CHANNEL_HANDLE}")
    channel_id = get_channel_id(args.api_key, CHANNEL_HANDLE)
    print(f"Channel ID: {channel_id}")

    playlist_id = get_uploads_playlist_id(args.api_key, channel_id)
    print(f"Uploads playlist ID: {playlist_id}")

    print("Fetching videos (this may take a moment for large channels)...")
    videos = fetch_all_videos(args.api_key, playlist_id)
    print(f"Found {len(videos)} videos.")

    write_csv(videos, OUTPUT_FILE)
    print(f"Exported to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
