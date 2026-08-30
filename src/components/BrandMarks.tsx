interface BrandMarkProps {
  size?: number;
}

export function LinkedInMark({ size = 20 }: BrandMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56z"
      />
    </svg>
  );
}

export function GitHubMark({ size = 20 }: BrandMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
      />
    </svg>
  );
}

export function EmailMark({ size = 20 }: BrandMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M2 6.5 12 13l10-6.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <path fill="#34A853" d="M2 6.5V18a2 2 0 0 0 2 2h.8V8.1z" />
      <path fill="#4285F4" d="M21.2 20H20a2 2 0 0 0 2-2V6.5l-8.4 5.5 7.6 8z" />
      <path fill="#FBBC04" d="M2.8 20H4a2 2 0 0 0 2 0l6-5.2L8.4 11.5z" />
    </svg>
  );
}
