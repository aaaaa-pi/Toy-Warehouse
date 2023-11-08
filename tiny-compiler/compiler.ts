import { codegen } from "./codegen"
import { parser } from "./parse"
import { tokenizer } from "./tokenizer"
import { transformer } from "./transformer"

export function compiler(code: string){
    const tokens = tokenizer(code)
    const ast = parser(tokens)
    const transformedAST = transformer(ast)
    return codegen(transformedAST) 
}