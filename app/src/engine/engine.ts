type CanvasCtx  = CanvasRenderingContext2D;
type Pos = [number, number];

class PosMap {
    private readonly map : Map<string, Set<Agent>> = new Map();

    add(pos : Pos, val : Agent) {
        const posString = JSON.stringify(pos);
        if(!(this.map.has(posString)))
            this.map.set(posString, new Set());
        this.map.get(posString)!.add(val);
    }

    get(pos : Pos) : Set<Agent> | undefined {
        return this.map.get(JSON.stringify(pos));
    }

    has(pos : Pos, val : Agent) : boolean {
        const posString = JSON.stringify(pos);
        const a = this.map.get(posString);
        if(!a || !(a.has(val)))
            return false;
        return true;
    }

    remove(pos : Pos, val : Agent) {
        const posString = JSON.stringify(pos);
        if(!(this.map.has(posString)))
            return;
        this.map.get(posString)!.delete(val);
    }
}

interface Stage {
    draw(ctx : CanvasCtx) : void;
}

export class DisplayEngine {
    private stage : Stage | undefined;
    sizeX : number;
    sizeY : number;

    constructor(sizeX : number, sizeY : number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw(ctx : CanvasCtx) : void {
        if(this.stage){
            ctx.clearRect(0, 0, this.sizeX, this.sizeY);
            this.stage.draw(ctx);
        }
    }

    setStage(stage : Stage){
        this.stage = stage;
    }
}

export class GridStage {
    readonly agentSize : number = 20;
    agents : Agent[] = [];
    agentMap = new PosMap();

    constructor(agentSize? : number){
        if(agentSize)
            this.agentSize = agentSize;
    }

    blocked(x : number, y : number) : boolean {
        const mp = this.agentMap.get([x,y]);
        if(!mp)
            return false;
        return mp.size > 0;
    }

    updateAgent(oldPos : Pos, newPos : Pos, ag : Agent) {
        if(this.agentMap.has(oldPos, ag))
            this.agentMap.remove(oldPos, ag);
        this.agentMap.add(newPos, ag);
    }

    draw(ctx : CanvasCtx) {
        for(let agent of this.agents){
            ctx.fillStyle = agent.fillStyle;
            ctx.fillRect(agent.posX * this.agentSize, agent.posY * this.agentSize, this.agentSize, this.agentSize);
        }
    }

    attach(ag : Agent) {
        this.agents.push(ag);
        this.agentMap.add([ag.posX, ag.posY], ag);
        ag.stage = this;
    }
}

export class Agent {
    private _pos : Pos;
    fillStyle : string;

    stage : GridStage | undefined;

    constructor(posX : number, posY : number, fillStyle : string){
        this._pos = [posX, posY];
        this.fillStyle = fillStyle;
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

    get posX() : number {
        return this._pos[0];
    }

    get posY() : number {
        return this._pos[1];
    }
}
