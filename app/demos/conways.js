const mvs = [[0, 1], [1, 0], [-1, 0], [0, -1],
             [1, 1], [1, -1], [-1, 1], [-1, -1]];

class ConwaysGrid extends G.GridStage {
    active(x, y) {
        for(let ag of this.agentMap.get([x,y]))
            if(ag.active)
                return true;
        return false;
    }
   
    async run(){
        await forever(50, () => {
            for(let agent of this.agents)
                agent.count();
            for(let agent of this.agents)
            	agent.update();
        });
    }
}

class ConwayAgent extends G.Agent {
    constructor(x, y, active){
        super(x, y, "black");
        this.active = active;
    }
    
    get active(){
        return this._active;
    }
    
    set active(val){
        this._active = val;
        this.fillStyle = val ? "black" : "white";
    }
    
    count() {
        this.cnt = 0;
        for(const d of mvs)
            if(this.stage.active(this.posX + d[0], this.posY + d[1]))
                this.cnt++;
    }
    
    update() {
        if(this.active && (this.cnt <  2 || this.cnt > 3))
                this.active = false;
        else if(!this.active && this.cnt == 3)
                this.active = true;
    }
}

async function main() {
    let grid = new ConwaysGrid();
    display.setStage(grid);
    
    const gridX = Math.floor(display.sizeX / grid.agentSize);
    const gridY = Math.floor(display.sizeY / grid.agentSize);
    for(let i = 0; i < gridX; i++)
        for(let j = 0; j < gridY; j++)
            grid.attach(new ConwayAgent(i, j, Math.random() > 0.5));
    await grid.run();
}

// BOILERPLATE
(async () => {
    const minTime = new Promise(resolve => setTimeout(resolve, 2000));
    await Promise.all([minTime, main()]);
    write('finished');
    finish();
})();
