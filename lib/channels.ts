export interface Channel {
  id: string;
  number: string;
  label: string;
  href: string;
}

export const channels: Channel[] = [
  { id: "hero", number: "01", label: "NOW BROADCASTING", href: "#hero" },
  { id: "about", number: "02", label: "PROFILE", href: "#about" },
  { id: "skills", number: "03", label: "SKILL SET", href: "#skills" },
  { id: "experience", number: "04", label: "CAREER LOG", href: "#experience" },
  { id: "projects", number: "05", label: "DEPLOYMENTS", href: "#projects" },
  { id: "education", number: "06", label: "CREDENTIALS", href: "#education" },
  { id: "contact", number: "07", label: "OPEN LINE", href: "#contact" },
];

export function channelMarker(channel: Channel) {
  return `CH ${channel.number} · ${channel.label}`;
}

export function getChannelById(id: string) {
  return channels.find((ch) => ch.id === id) ?? channels[0];
}

export function getChannelByHref(href: string) {
  return channels.find((ch) => ch.href === href) ?? channels[0];
}
