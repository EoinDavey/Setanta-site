async function main() {
    const g = new G.GridStage();
    display.setStage(g);
    
    const szX = Math.floor(display.sizeX / g.agentSize);
    const szY = Math.floor(display.sizeY / g.agentSize);
    
    const midX = Math.floor(szX / 2);
    const midY = Math.floor(szY / 2);
    
    for(let i = 0; i < szX; i++){
    	g.attach(new G.Agent(i, szY - 1, "green"));
        g.attach(new G.Agent(i, 0, "green"));
    }
    
    for(let i = 1; i < szY-1; i++){
        g.attach(new G.Agent(0, i, "green"));
        g.attach(new G.Agent(szX-1, i, "green"));
    }
    
    const ball = new G.Agent(midX, midY, "red");
    g.attach(ball);
    let dx = 1;
    let dy = 1;
    await forever(5, () => {
        if(g.blocked(ball.posX+dx, ball.posY))
            dx = -dx;
        if(g.blocked(ball.posX, ball.posY + dy))
            dy = -dy;
        ball.moveTo([ball.posX + dx, ball.posY + dy]);
        if(g.blocked(ball.posX+dx, ball.posY) && g.blocked(ball.posX, ball.posY + dy))
            write('gotem');
    });
}
main();
