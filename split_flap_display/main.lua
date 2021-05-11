function love.load()
    text_from = "NORWICH"
    text_to   = "ROXFORT"

    IDLE     = 0
    CHANGING = 1
    SUSTAIN  = 2
    FIRE     = 3
    state = IDLE
    CONFIG = "config.dat"
    SPEED_OF_FLAP = 5
    BACK_TO_IDLE_SECS = 60
    CHANGE_LENGTH = 20
    LETTER_WIDTH = 300
    LETTER_HEIGHT = 512
    ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!. :"
    success = love.window.setFullscreen(true)
    --love.graphics.setDefaultFilter("nearest","nearest")
    img = love.graphics.newImage("all_letter.png")
    snd = love.audio.newSource("split_flap_sound.ogg","static")
 
    love.mouse.setVisible(false)

    position={
        x = 0,
        y = 0,
        yd =0,
        xd = 0,
        pix = 10,
        pixd = 0,
        from = "NULL",
        to="NULL"
    }
   
    changetime = 0 

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

    letters={}    

    local k=1
    for j=0,1536,512 do
        for i=0,2700,300 do
            local letter={}
            letter.x=i
            letter.y=j
            letter.chr=string.sub(ABC,k,k)
            letter.quad = love.graphics.newQuad(i, j, LETTER_WIDTH, LETTER_HEIGHT, img:getDimensions())
            table.insert(letters,letter)
            k = k + 1
        end
    end
    
    t=0
    w=love.window.getMode()
end

function love.update(dt)
    if state==FIRE then
        snd:play()
        state = CHANGING
        changetime=0
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
                love.graphics.draw(img, letters[j].quad, position.x+(i-1) * LETTER_WIDTH, position.y)
            end
        end
    end
end

function textMutator()
    if t%SPEED_OF_FLAP==0 and state==CHANGING then
        local hasChanged = false        
        local txt = ""
        for i=1,string.len(position.from) do
            if string.sub(position.from,i,i)==string.sub(position.to,i,i) and changetime > CHANGE_LENGTH then
               txt = txt..string.sub(position.from,i,i)
            else 
               txt = txt..getNextLetter(string.sub(position.from,i,i))
                hasChanged = true
            end
        end
        changetime = changetime + 1
        if not hasChanged then
            state = SUSTAIN
            t_sustain = BACK_TO_IDLE_SECS
            snd:stop()
        end
        return txt
    else
        return position.from
    end
end

function getNextLetter(char)
    local abc=ABC..ABC..ABC
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
	love.mouse.setVisible(true)
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
        position.yd = 40
    end
    if key == "w" then
        position.yd = -40
    end
    if key == "d" then
		position.xd = 40
    end
    if key == "a" then
	    position.xd = -40
    end
    if key == "e" then
		position.pixd = 2
    end
    if key == "q" then
	    position.pixd = -2
    end
    if key == "space" and state==IDLE then
	    state = FIRE
    end
end
