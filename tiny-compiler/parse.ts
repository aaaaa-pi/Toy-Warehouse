import {Token, TokenTypes} from "./tokenizer";

export enum NodeTypes {
    NumberLiteral = "NumberLiteral",
    Program = "Program",
    StringLiteral = "StringLiteral",
    CallExpression = "CallExpression",
}

interface Node {
    type: NodeTypes
}

interface RootNode extends Node{
    type: NodeTypes.Program
    body: any[]
}

interface NumberNode extends Node{
    type: NodeTypes.NumberLiteral
    value: string
}
interface CallExpressionNode extends Node {
    type: NodeTypes.CallExpression
    name: string
    params: any[]
}

function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        body: [],
    }
}
function createNumberNode(value: string): NumberNode {
    return {
        type: NodeTypes.NumberLiteral,
        value
    }
}

function createCallExpressionNode(name): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: []
    }
}
export function parser(tokens: Token[]) {
    let current = 0;
    const rootNode = createRootNode()

    function walk() {
        let token = tokens[current]
        if(token.type === TokenTypes.Number){
            current ++
            return createNumberNode(token.value)
        }

        if(token.type === TokenTypes.Paren && token.value === "("){
            token = tokens[++current]
            let node = createCallExpressionNode(token.value)

            token = tokens[++ current];
            while(!(token.type === TokenTypes.Paren && token.value === ")")){
                node.params.push(walk())
                token = tokens[current]
            }

            current ++
            return node
        }

        throw new Error(`不认识的token: ${token}`)
    }

    while (current < tokens.length){
        rootNode.body.push(walk())
    }
    return rootNode
};