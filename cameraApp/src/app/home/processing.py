import cv2
import numpy as np
from statistics import mode
import pandas as pd


def lineDetection(img):
    img = cv2.imread(img)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 150, apertureSize=3)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    dilation = cv2.dilate(edges, kernel, iterations=1)
    lines = cv2.HoughLinesP(dilation, rho=1, theta=1*np.pi /
                            180, threshold=530, minLineLength=100, maxLineGap=50)
    imgShape = img.shape
    return(lines, imgShape)


def select_rgb_white(image):
    # white color mask
    lower = np.uint8([225, 225, 225])
    upper = np.uint8([255, 255, 255])
    white_mask = cv2.inRange(image, lower, upper)

    masked = cv2.bitwise_and(image, image, mask=white_mask)
    return masked


def linesPositions(imgPath, houghimage):
    masked = select_rgb_white(imgPath)
    lines, imgShape = lineDetection(masked)
    line_dict = {'left': [], 'right': []}
    img_center = imgShape[1]//2
    for line in lines:
        for x1, y1, x2, y2 in line:
            if x1 < img_center and x2 < img_center:
                position = 'left'

            elif x1 > img_center and x2 > img_center:
                position = 'right'

            else:
                continue
            line_dict[position].append(np.array([x1, y1]))
            line_dict[position].append(np.array([x2, y2]))
            cv2.line(houghimage, (x1, y1), (x2, y2), (0, 255, 0), 2)

    return(line_dict, houghimage)


def DirectionOfTheCar(imgPath):
    image = cv2.imread(imgPath)
    houghLinesImage = np.zeros_like(image)
    positionOfTheLine, finalimage = linesPositions(image, houghLinesImage)

    cv2.imwrite("finalimage.jpeg", finalimage)

    left, right = len(positionOfTheLine['left']), len(
        positionOfTheLine['right'])

    direction = {''}

    if((np.abs(left-right) <= 10)):
        direction = {'forward'}

    elif(left > right):
        direction = {'backword', 'right'}

    elif(right > left):
        direction = {'backword', 'left'}
    else:
        direction = {'backword', 'stop'}
    return(direction)


def main():

    # Creating a VideoCapture object to read the video
    cap = cv2.VideoCapture(stream)

    # Loop untill the end of the video
    while (cap.isOpened()):
            # Capture frame-by-frame
            ret, frame = cap.read()

            frame = cv2.resize(frame, (540, 380), fx=0, fy=0,
                               interpolation=cv2.INTER_CUBIC)

            DirectionOfTheCar(frame)

            # define q as the exit button
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break

    # release the video capture object
    cap.release()
    # Closes all the windows currently opened.
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
