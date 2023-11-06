import { RootNode,ChildNode, NodeTypes, CallExpressionNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
    enter: MethodFn;
    exit?: MethodFn;
}
export interface Visitor {
    Program?: VisitorOption;
    CallExpression?: VisitorOption;
    NumberLiteral?: VisitorOption;
    StringLiteral?: VisitorOption,
}
export function traverser(rootNode: RootNode, visitor: Visitor){
    // 1. 深度优先搜索
    // 2. visitor
    function traverseArray(array: ChildNode[],parent?:ParentNode) {
        array.forEach((node) => {
            traverseNode(node,parent)
        })
    }

    function traverseNode(node: ChildNode | RootNode, parent?:ParentNode) {
        const visitorObj = visitor[node.type]
        if(visitorObj){
            visitorObj.enter(node,parent);
        }
        switch (node.type) {
            case NodeTypes.NumberLiteral:
                break;
            case NodeTypes.CallExpression:
                traverseArray(node.params,node);
                break;
            case NodeTypes.Program:
                traverseArray(node.body,node);
                break;
        }
        if(visitorObj?.exit && visitorObj){
            visitorObj.exit(node,parent);
        }
    }

    traverseNode(rootNode)
}