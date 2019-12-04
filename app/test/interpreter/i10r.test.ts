import { Interpreter, Value } from '../../src/interpreter/i10r';
import { Parser } from '../../src/interpreter/parser';

test('test expressions', () => {
    interface tc { inp: string, exp: Value}
    const cases : tc[] = [
        {inp : '12 + 3*5', exp : 27},
        {inp : '12 + 3*5 == 27', exp : true},
        {inp : '12-12-12', exp : -12},
        {inp : '12*2/3', exp : 8},
        {inp : '1 <= 0', exp : false},
        {inp : '1 >= 0', exp : true}
    ];
    for(let c of cases){
        const i = new Interpreter();
        const p = new Parser(c.inp);
        const res = p.parse();
        expect(res.err).toBeNull();
        expect(res.ast).not.toBeNull();
        const got = i.evalExpr(res.ast!);
        expect(got).toEqual(c.exp);
    }
});
