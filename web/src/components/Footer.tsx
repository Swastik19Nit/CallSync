const LINKS = [
  {
    title: "Github",
    items: [
      { name: "Swastik", link: "https://github.com/Swastik1493" },
      { name: "Swastik", link: "https://github.com/Swastik063" },
    ],
  },
  {
    title: "LinkedIn",
    items: [
      { name: "Swastik", link: "https://www.linkedin.com/in/Swastiksharma14/" },
      { name: "Swastik", link: "https://www.linkedin.com/in/Swastikkapoor06/" },
    ],
  },
  {
    title: "Contact Us",
    items: [
      { name: "Swastik", link: "https://www.linkedin.com/in/Swastiksharma14/" },
      { name: "Swastik", link: "https://www.linkedin.com/in/Swastikkapoor06/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-home">
      <div className="mx-auto w-full max-w-7xl px-8 py-2 text-mainText">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <h5 className="text-3xl font-secondHeading">CalSync.live</h5>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <div className="font-medium font-heading text-gray font-heading">
                  {title}
                </div>
                {items.map(({ name, link }) => (
                  <li key={name}>
                    <a
                      href={link}
                      target="_blank"
                      className="font-normal font-heading transition-colors opacity-40 text-blue-gray hover:text-blue-gray-900"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
