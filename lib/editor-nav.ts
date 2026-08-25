export interface EditorNavNode {
  id: string;
  label: string;
  href: string;
}

export const editorSceneChildren: EditorNavNode[] = [
  { id: "hero", label: "Scene Root", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const editorSectionIds = editorSceneChildren.map((node) => node.href);

export function getEditorNodeLabel(href: string) {
  return editorSceneChildren.find((node) => node.href === href)?.label ?? "Scene Root";
}
