# python3 code
# import the opencv library
import cv2
import tkinter as tk


class Webcam_Capture:
    def __init__(self):
        # define a video capture object
        self.vid = cv2.VideoCapture(0)
          
        while(True):
              
            # Capture the video frame
            # by frame
            ret, frame = self.vid.read()
          
            # Display the resulting frame
            cv2.imshow('frame', frame)
              
            # the 'q' button is set as the
            # quitting button you may use any
            # desired button of your choice
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
          
        # After the loop release the cap object
        self.vid.release()
        # Destroy all the windows
        cv2.destroyAllWindows()

if __name__ == '__main__':
    app = Webcam_Capture()
