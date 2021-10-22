-- Warning, pseudo-code!
local image, camera

function love.load()
  image = love.graphics.newImage( love.image.newImageData( 320, 240 ) ) -- frames will be grabbed at 320x240
  camera = love.camera.initDevice( 0, image ) -- initializes device 0, will grab frames into image
end

function love.update()
  if camera:isFrameReady() then
    camera:grab() -- unloads and loads the image to refresh the texture with the new frame
    -- maybe I'll remove isFrameReady and make grab not modify the current frame if there
    -- isn't another one ready to be grabbed
  end
end

function love.draw()
  draw( image, 0, 0 )
end
