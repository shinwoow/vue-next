import { TestElement, TestNode, NodeTypes, TestText } from './nodeOps'

export function serialize(
  node: TestNode,
  indent: number = 0,
  depth: number = 0
): string {
  if (node.type === NodeTypes.ELEMENT) {
    return serializeElement(node, indent, depth)
  } else {
    return serializeText(node, indent, depth)
  }
}

function serializeElement(
  node: TestElement,
  indent: number,
  depth: number
): string {
  const props = Object.keys(node.props)
    .map(key => {
      return `${key}=${JSON.stringify(node.props[key])}`
    })
    .join(' ')
  const children = node.children.length
    ? (indent ? `\n` : ``) +
      node.children.map(c => serialize(c, indent, depth + 1)) +
      (indent ? `\n` : ``)
    : ``
  const padding = indent ? ` `.repeat(indent).repeat(depth) : ``
  return (
    `${padding}<${node.tag}${props ? ` ${props}` : ``}>` +
    `${children}` +
    `${padding}</${node.tag}>`
  )
}

function serializeText(node: TestText, indent: number, depth: number): string {
  const padding = indent ? ` `.repeat(indent).repeat(depth) : ``
  return padding + node.text
}
