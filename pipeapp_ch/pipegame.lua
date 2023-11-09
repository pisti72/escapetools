function love.load()
    love.window.setTitle("Pipegame")
    start_time = os.clock()
    font = love.graphics.newFont( "fonts/built titling bd.ttf", 500)
    love.graphics.setFont(font)
    success = love.window.setFullscreen(true)
    love.mouse.setVisible(false)
    heart_live = love.graphics.newImage("gfx/heart_600x600_live.png")
    heart_died = love.graphics.newImage("gfx/heart_600x600_died.png")

    snd_error = love.audio.newSource("snd/142608__autistic-lucario__error.wav","static")
    snd_notification = love.audio.newSource("snd/257227__javierzumer__ui-interface-positive.wav","static")    
    snd_select = love.audio.newSource("snd/270401__littlerobotsoundfactory__menu-select-00.wav","static")
    
    display={w=800,h=600}
    lives = 3

    CAN_TOUCH = 50

    LEFT = 0
    RIGHT = 1
    NOPE = 2
    last_parking = NOPE

    IDLE = 0
    INGAME = 1
    INVULNERABLE = 2
    ENTER_NAME = 3
    GAME_OVER = 4

    state = IDLE
    
    t=0
end

function love.update(dt)
    if state == INGAME or state == INVULNERABLE then 
        player_time = os.clock()-start_time
    end    
    if state == INVULNERABLE then
        if t > 0 then        
            t=t-1
        else
            state = INGAME
        end
    end
    
end

function love.draw()
    if state == IDLE then
        love.graphics.print("PIPEGAME",120,400)
    elseif state == INGAME or state == INVULNERABLE then
        love.graphics.print(getMinutes()..":"..getSeconds()..":"..getMilliseconds(),120,400)
    elseif state == GAME_OVER then
        love.graphics.print("GAME OVER",0,400)
    elseif state == ENTER_NAME then
        love.graphics.print("YOUR NAME",0,0)
    end

    if state == INGAME or state == INVULNERABLE or state == GAME_OVER then
        for i=0,lives-1 do
            love.graphics.draw(heart_live,i*600 + 100,0,0,0.8)
        end
        for i=lives,2 do
            love.graphics.draw(heart_died,i*600 + 100,0,0,0.8)
        end
        
    end
end

function getMilliseconds(n)
    local i=tostring(math.floor(player_time*1000)%100)
    if #i==1 then i="0"..i end
    return i
end

function getSeconds(n)
    local i=tostring(math.floor(player_time*10)%60)
    if #i==1 then i="0"..i end
    return i
end

function getMinutes(n)
    local i=tostring(math.floor(player_time*10/60)%60)
    if #i==1 then i="0"..i end
    return i
end

function love.keypressed(key)
    if key == "q" then
        if state == IDLE then
            last_parking = LEFT
            state = INGAME
            start_time = os.clock()
            snd_notification:play()
            lives = 3
        elseif state == INGAME then
            if last_parking == LEFT then
                state = IDLE
            else
                state = ENTER_NAME
                last_parking = LEFT
            end
        elseif state == GAME_OVER then
            state = IDLE
            last_parking = LEFT
            snd_notification:play()
        end
    elseif key == "p" then
        if state == IDLE then
            last_parking = RIGHT
            state = INGAME
            start_time = os.clock()
            snd_notification:play()
            lives = 3
        elseif state == INGAME then
            if last_parking == RIGHT then
                state = IDLE
            else
                state = ENTER_NAME
                last_parking = RIGHT
            end
        elseif state == GAME_OVER then
            state = IDLE
            last_parking = RIGHT
            snd_notification:play()
        end
    elseif key == "t" then
        if state == INGAME then
            state = INVULNERABLE
            if lives > 0 then            
                lives = lives - 1
                t = CAN_TOUCH
                snd_error:play()
                if lives == 0 then
                    state = GAME_OVER
                end
            end
        end
    end
end

function love.keyreleased(key)
    if key == "escape" then
        --init_gpio_finished()
		--finished:close()
        --ring:close()
        success = love.window.setFullscreen(false)
        love.mouse.setVisible(true)
        love.window.close()
        love.event.quit()
    end
end
