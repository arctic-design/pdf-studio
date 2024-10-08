export function Logo(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 512 512"
      width="32"
      height="32"
      fill="var(--snow-colors-grey-900)"
      {...props}
    >
      <path d="M120.4 1.1c-2.9.5-8.1 1.9-11.8 3.2-18.8 6.9-32.4 20.5-40 40.1l-3.1 8.1v406l2.8 8c7.3 20.6 22.1 35.1 43.2 42.3l8 2.7H255c148.1 0 139.8.3 153.5-6 18.7-8.6 31.3-23.9 36.5-44.1 2-7.5 2-11.4 2-159.6V150H303l-.2-74.8-.3-74.7L214 .4c-48.7-.1-90.8.2-93.6.7zM186 289c16.5 3.1 26.1 15.6 24.7 32-1.6 19-14.4 28-39.9 28H163v33h-25v-46.3c0-25.5.3-46.7.7-47 1-1.1 41.5-.8 47.3.3zm84 1.5c18.2 5.8 28.8 17.1 31.9 33.9 4.1 22.7-4 42-21.6 51.4-9.7 5.2-16.2 6.2-39.5 6.2H220v-46.3c0-25.5.3-46.7.8-47.1.4-.5 10.4-.6 22.2-.3 16.7.3 22.7.8 27 2.2zm111.5 8v10l-21.2.3-21.3.2v15h34v20h-34v38h-24v-94l33.3.2 33.2.3v10z" />
      <path d="M163 318.5v9.5h7.4c4 0 8.7-.5 10.5-1.1 6.8-2.4 8-12.2 1.8-15.9-2.5-1.6-5-2-11.4-2H163v9.5zM244 335v26h7.3c18.5 0 27.4-9.1 27-27.3-.4-15.9-10.6-24.7-28.8-24.7H244v26z" />
    </svg>
  );
}
