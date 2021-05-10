function love.load()
    IDLE     = 0
    CHANGING = 1
    SUSTAIN  = 2
    FIRE     = 3
    state = IDLE
    CONFIG = "config.dat"
    success = love.window.setFullscreen(true)
    img = love.graphics.newImage("wall-murals-split-flap-display-illustration.jpg")
    snd = love.audio.newSource("split_flap_sound.ogg","static")
 
    position={
        x = 0,
        y = 0,
        yd =0,
        xd = 0,
        pix = 30,
        pixd = 0,
        from = "NULL",
        to="NULL"
    }
    
    text_from = "NORWICH"
    text_to   = "ROXFORT"

    position.from = text_from
    position.to = text_from

    t_sustain = 0
    if love.filesystem.getInfo(CONFIG) then
        contents = love.filesystem.read(CONFIG)
        local i = string.find(contents, "/")
        local j = string.find(contents, "/",i + 1)

        position.x = string.sub(contents, 1  , i-1) * 1
        position.y = string.sub(contents, i+1, j-1) * 1
        position.pix = string.sub(contents, j+1, string.len(contents)) * 1
    else
        data = position.x.."/"..position.y.."/"..position.pix
        love.filesystem.write(CONFIG,data)
    end

    data={
        {chr="A",x=10,y=315},
        {chr="B",x=68,y=315},
        {chr="C",x=127,y=315},
        {chr="D",x=185,y=315},
        {chr="E",x=244,y=315},
        {chr="F",x=302,y=315},
        {chr="G",x=361,y=315},
        {chr="H",x=419,y=315},
        {chr="I",x=478,y=315},
        {chr="J",x=537,y=315},
        {chr="K",x=10,y=409},
        {chr="L",x=68,y=409},
        {chr="M",x=127,y=409},
        {chr="N",x=185,y=409},
        {chr="O",x=244,y=409},
        {chr="P",x=302,y=409},
        {chr="Q",x=361,y=409},
        {chr="R",x=419,y=409},
        {chr="S",x=478,y=409},
        {chr="T",x=537,y=409},
        {chr="Y",x=10,y=503},
        {chr="V",x=68,y=503},
        {chr="W",x=127,y=503},
        {chr="X",x=185,y=503},
        {chr="Y",x=244,y=503},
        {chr="Z",x=302,y=503},
        {chr="U",x=478,y=201},
        {chr=" ",x=185,y=201}
    }
    letters={}
    for i = 1,#data do
        a = {}
        a.chr = data[i].chr
        a.quad = love.graphics.newQuad(data[i].x, data[i].y, 58, 94, img:getDimensions())
        table.insert(letters,a)
    end
    t=0
    w=love.window.getMode()
end

function love.update(dt)
    if state==FIRE then
        snd:play()
        state = CHANGING
        position.to = text_to
    elseif state==SUSTAIN then
        t_sustain = t_sustain - dt
        if t_sustain <= 0 then
            position.from = text_from
            position.to = text_from
            state = IDLE
        end
    end
    position.y = position.y + position.yd * dt
    position.x = position.x + position.xd * dt
    position.pix = position.pix + position.pixd * dt
    t=t+1
end

function love.draw()
    love.graphics.push()
    love.graphics.scale(position.pix/10)
    txt = textMutator()
    position.from = txt
    drawString(txt)
    love.graphics.pop()
    if state==SUSTAIN then
        love.graphics.print(math.floor(t_sustain),0,0)
    end    
end

function drawString(txt)
    for i=1,string.len(txt) do
        for j=1,#letters do
            if string.sub(txt,i,i)==letters[j].chr then
                love.graphics.draw(img, letters[j].quad, position.x+(i-1)*58, position.y)
            end
        end
    end
end

function textMutator()
    if t%20==0 and state==CHANGING then
        local hasChanged = false        
        local txt = ""
        for i=1,string.len(position.from) do
            if string.sub(position.from,i,i)==string.sub(position.to,i,i) then
               txt = txt..string.sub(position.from,i,i)
            else 
               txt = txt..getNextLetter(string.sub(position.from,i,i))
                hasChanged = true
            end
        end
        if not hasChanged then
            state = SUSTAIN
            t_sustain = 60
            snd:stop()
        end
        return txt
    else
        return position.from
    end
end

function getNextLetter(char)
    local abc="ABCDEFGHIJKLMNOPQRSTUWXYZ ABCDEFGHIJKLMNOPQRSTUWXYZ "
    for i=1,string.len(abc) do
        if string.sub(abc,i,i)==char then
            return string.sub(abc,i+1,i+1)
        end
    end
    return " "
end

function love.keyreleased(key)
    if key == "escape" then
	    success = love.window.setFullscreen(false)
        data = position.x.."/"..position.y.."/"..position.pix
        love.filesystem.write(CONFIG,data)
        love.window.close()
        love.event.quit()
    end
    if key == "s" or key == "w" then
	    position.yd = 0
        position.y = math.floor(position.y)
    end
    if key == "a" or key == "d" then
	    position.xd = 0
        position.x = math.floor(position.x)
    end
    if key == "q" or key == "e" then
	    position.pixd = 0
        position.pix = math.floor(position.pix*10)/10
    end
end

function love.keypressed(key)
    if key == "s" then
        position.yd = 20
    end
    if key == "w" then
        position.yd = -20
    end
    if key == "d" then
		position.xd = 20
    end
    if key == "a" then
	    position.xd = -20
    end
    if key == "e" then
		position.pixd = 5
    end
    if key == "q" then
	    position.pixd = -5
    end
    if key == "space" and state==IDLE then
	    state = FIRE
    end
end
