http://love2d.org/forums/viewtopic.php?p=233642

https://github.com/vsergeev/lua-periphery

[code]
local GPIO = require('periphery').GPIO

    local gpio_out = GPIO("/dev/gpiochip0", 17, "out")
    gpio_out:write(false)
    gpio_out:close()
[/code]

$ sudo apt install luarocks



[https://github.com/vsergeev/lua-periphery]

$ sudo luarocks install lua-periphery



[https://github.com/ryanplusplus/rpio.lua/]

$ sudo luarocks install rpio

( ExplainingComputers: Raspberry Pi: Using GPIO Inputs)[https://youtu.be/NAl-ULEattw]

