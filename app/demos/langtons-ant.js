class LangtonsGrid extends G.GridStage {
    active(x, y) {
        for(let agent of this.agentMap.get([x,y]))
            if(agent != this.ant && agent.fillStyle=="purple")
                return true;
        return false;
    }
    
    toggle(x, y){
        for(let agent of this.agentMap.get([x, y])){
            if(agent != this.ant){
                agent.fillStyle = (agent.fillStyle == "purple" ? "white" : "purple");
                return;
            }
        }
        // No agent here
        const ag = new G.Agent(x, y, "purple");
        this.attach(ag);
    }
    
    attachAnt(ant){
        this.attach(ant);
        this.ant = ant;
    }
}

class Ant extends G.DirectionalAgent {
    async walk() {
        await forever(0, () => {
            if(this.stage.active(this.posX, this.posY))
                this.turnRight();
            else
                this.turnLeft();
            this.stage.toggle(this.posX, this.posY);
            this.moveForward();
        });
    }
}

async function main() {
    const g = new LangtonsGrid();
    g.agentSize = 15;
    const midX = Math.floor((display.sizeX / g.agentSize)/2);
    const midY = Math.floor((display.sizeY / g.agentSize)/2);
    const ant = new Ant(midX, midY, "green");
    g.attachAnt(ant);
    display.setStage(g);
	await ant.walk();
}

// BOILERPLATE
(async ()=> {
    const minTime = new Promise(resolve => setTimeout(resolve, 2000));
    await Promise.all([minTime, main()]);
    write('finished');
    finish();
})();
