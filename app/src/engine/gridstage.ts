import { Pos, CanvasCtx } from './types';

class PosMap {
    private readonly map : Map<string, Set<SimpleAgent>> = new Map();

    add(pos : Pos, val : SimpleAgent) {
        const posString = JSON.stringify(pos);
        if(!(this.map.has(posString)))
            this.map.set(posString, new Set());
        this.map.get(posString)!.add(val);
    }

    get(pos : Pos) : Set<SimpleAgent> {
        const a = this.map.get(JSON.stringify(pos));
        if(!a)
            return new Set();
        return a;
    }

    has(pos : Pos, val : SimpleAgent) : boolean {
        const posString = JSON.stringify(pos);
        const a = this.map.get(posString);
        if(!a || !(a.has(val)))
            return false;
        return true;
    }

    remove(pos : Pos, val : SimpleAgent) {
        const posString = JSON.stringify(pos);
        if(!(this.map.has(posString)))
            return;
        this.map.get(posString)!.delete(val);
    }
}

export class GridStage {
    readonly agentSize : number = 20;
    levels : number[] = [];
    agentLs : Map<number, SimpleAgent[]> = new Map();
    agents : SimpleAgent[] = [];
    agentMap = new PosMap();

    constructor(agentSize? : number){
        if(agentSize)
            this.agentSize = agentSize;
    }

    blocked(x : number, y : number) : boolean {
        const mp = this.agentMap.get([x,y]);
        return mp.size > 0;
    }

    updateAgent(oldPos : Pos, newPos : Pos, ag : SimpleAgent) {
        if(this.agentMap.has(oldPos, ag))
            this.agentMap.remove(oldPos, ag);
        this.agentMap.add(newPos, ag);
    }

    draw(ctx : CanvasCtx) {
        for(let lvl of this.levels){
            for(let agent of this.agentLs.get(lvl)!){
                ctx.fillStyle = agent.fillStyle;
                ctx.fillRect(agent.posX * this.agentSize, agent.posY * this.agentSize, this.agentSize, this.agentSize);
            }
        }
    }

    attach(ag : SimpleAgent) {
        if(!this.agentLs.has(ag.level)){
            this.agentLs.set(ag.level, []);
            this.levels.push(ag.level); this.levels.sort();
        }
        this.agentLs.get(ag.level)!.push(ag);
        this.agentMap.add([ag.posX, ag.posY], ag);
        this.agents.push(ag);
        ag.stage = this;
    }
}

class SimpleAgent {
    protected _pos : Pos;
    fillStyle : string;
    stage : GridStage | undefined;
    level : number;

    constructor(posX : number, posY : number, fillStyle : string, level : number = 0){
        this._pos = [posX, posY];
        this.fillStyle = fillStyle;
        this.level = level;
    }

    handleUpdate(oldPos : Pos, newPos : Pos) {
        if(!(this.stage))
            return;
        this.stage.updateAgent(oldPos, newPos, this);
    }

    moveTo(newPos : Pos){
        let oldPos : Pos = [...this._pos] as Pos;
        this._pos = newPos;
        this.handleUpdate(oldPos, newPos);
    }

    get posX() : number {
        return this._pos[0];
    }

    get posY() : number {
        return this._pos[1];
    }
}

enum Dir {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

export class DirectionalAgent extends SimpleAgent {
    dir : Dir = Dir.Up;

	turnRight(){
        const t : Map<Dir, Dir> = new Map([[Dir.Up, Dir.Right], [Dir.Right, Dir.Down],
            [Dir.Down, Dir.Left], [Dir.Left, Dir.Up]]);
        this.dir = t.get(this.dir)!;
    }

	turnLeft(){
        const t : Map<Dir, Dir> = new Map([[Dir.Up, Dir.Left], [Dir.Right, Dir.Up],
            [Dir.Down, Dir.Right], [Dir.Left, Dir.Down]]);
        this.dir = t.get(this.dir)!;
    }

    moveForward() {
        const t : Map<Dir, Pos> = new Map([
            [Dir.Up, [this.posX, this.posY - 1] as Pos],
            [Dir.Right, [this.posX + 1, this.posY] as Pos],
            [Dir.Down, [this.posX, this.posY + 1] as Pos],
            [Dir.Left, [this.posX - 1, this.posY] as Pos]]);
        this.moveTo(t.get(this.dir)!);
    }
}

export class Agent extends SimpleAgent {
    moveUp() : void {
        this.moveTo([this.posX, this.posY - 1]);
    }

    moveDown() : void {
        this.moveTo([this.posX, this.posY + 1]);
    }

    moveLeft() : void {
        this.moveTo([this.posX - 1, this.posY]);
    }

    moveRight() : void {
        this.moveTo([this.posX + 1, this.posY]);
    }
}
