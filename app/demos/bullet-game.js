function randRange(l, r) {
    return Math.floor(Math.random() * Math.abs(r - l)) + l;
}

class Paddle {
    constructor(x, y, sz) {
        this.agents = []
        for(let i = 0; i < sz; i++)
            this.agents.push(new G.Agent(x + i, y, "green"));
    }
    
    attachTo(stage){
        for(let agent of this.agents)
            stage.attach(agent);
    }
    
    moveRight(){
    	this.agents.forEach(agent => agent.moveRight());
    }
    
    moveLeft() {
        this.agents.forEach(agent => agent.moveLeft());
    }
    
    control(code) {
        if(code == "ArrowRight")
            this.moveRight();
        if(code == "ArrowLeft")
            this.moveLeft();
    }
}

class Bullet extends G.Agent {
    constructor(x, y, failY){
        super(x, y, "red");
        this.failed = false;
        this.failY = failY;
    }
    async start(){
        await forever(80, () => {
            if(this.failed)
                return;
            if(this.stage.blocked(this.posX, this.posY+1)){
                this.moveTo([-1,-1]);
                this.failed = true;
            }
            this.moveDown();
            if(this.posY > this.failY){
                write("Failed");
                this.failed = true;
                finish();
            }
        });
    }
}

async function main() {
    const g = new G.GridStage();
    display.setStage(g);
    const szX = Math.floor(display.sizeX / g.agentSize);
    const szY = Math.floor(display.sizeY / g.agentSize);
    
    const p = new Paddle(Math.floor(szX / 2) - 5, szY - 3, 10);
    p.attachTo(g);
    
    display.registerKeyHandler(code => p.control(code))
    
    await sleep(3000);
    await forever(2000, () => {
        const x = randRange(0, szX);
        const bull = new Bullet(x, 0, szY - 3);
        g.attach(bull);
        bull.start();
    });
}

main();
