local periphery = require('periphery');
local GPIO = periphery.GPIO
SHOWTIME = 60*60*10 --10 mins
SENSITIVITY = 30
t=0
n=0

function love.load()
  success = love.window.setFullscreen(true)
  love.mouse.setVisible(false)
  gpio_6 = GPIO(6,"in")
  picture = love.graphics.newImage("monitor_1280x720.jpg")
end

function love.keypressed(key, scancode, isrepeat)
  if key == "escape" then
    print("escape pressed")
    love.event.quit()
  elseif key == "space" then
    print("space pressed")
    t = SHOWTIME
  end
end

function love.draw()
  local sign = gpio_6:read()
  if sign then
    n = n + 1
    if n == 1 then
      print("gpio activated")
    end
    if n>SENSITIVITY then
      t = SHOWTIME
      print("picture shown")
    end
  else
    n = 0
  end
  love.graphics.setColor(1,1,1);
  if t>0 then
    t = t - 1
    if t == 1 then
      print("black shown")
    end
    love.graphics.draw(picture, 0, 0)
  else
    love.graphics.setColor(0,0,0);
    love.graphics.rectangle("fill",0,0,1280,720)
  end
end
