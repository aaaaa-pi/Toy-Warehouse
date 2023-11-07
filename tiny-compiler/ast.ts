export enum NodeTypes {
    NumberLiteral = "NumberLiteral",
    Program = "Program",
    StringLiteral = "StringLiteral",
    CallExpression = "CallExpression",
}
export type ChildNode =
  | NumberLiteralNode
  | CallExpressionNode

export interface Node {
    type: NodeTypes
}

export interface RootNode extends Node{
    type: NodeTypes.Program
    body: ChildNode[]
    context?: ChildNode[]
}

export interface NumberLiteralNode extends Node{
    type: NodeTypes.NumberLiteral
    value: string
}
export interface CallExpressionNode extends Node {
    type: NodeTypes.CallExpression
    name: string
    params: ChildNode[]
    context?: ChildNode[]
}

export function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        body: [],
    }
}
export function createNumberLiteralNode(value: string): NumberLiteralNode {
    return {
        type: NodeTypes.NumberLiteral,
        value
    }
}

export function createCallExpression(name): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: []
    }
}