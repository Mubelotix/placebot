#!/usr/bin/env python
from PIL import Image
im = Image.open("foo.jpg")
px = im.load()
output = ""
width, height = im.size
for y in range (height):
    for x in range (width):
        pixel = px[x, y]

        if x > 100:
            break

        if abs(pixel[0] - 190) < 10 and abs(pixel[1] - 0) < 10 and abs(pixel[2] - 57) < 10:
            output += "r"
        elif abs(pixel[0] - 255) < 10 and abs(pixel[1] - 69) < 10 and abs(pixel[2] - 0) < 10:
            output += "r"
        elif abs(pixel[0] - 255) < 10 and abs(pixel[1] - 168) < 10 and abs(pixel[2] - 0) < 10:
            output += "O"
        elif abs(pixel[0] - 255) < 10 and abs(pixel[1] - 214) < 10 and abs(pixel[2] - 53) < 10:
            output += "y"
        elif abs(pixel[0] - 0) < 10 and abs(pixel[1] - 163) < 10 and abs(pixel[2] - 104) < 10:
            output += "1"
        elif abs(pixel[0] - 126) < 10 and abs(pixel[1] - 237) < 10 and abs(pixel[2] - 8) < 10:
            output += "g"
        elif abs(pixel[0] - 36) < 10 and abs(pixel[1] - 80) < 10 and abs(pixel[2] - 164) < 10:
            output += "b"
        elif abs(pixel[0] - 54) < 10 and abs(pixel[1] - 144) < 10 and abs(pixel[2] - 234) < 10:
            output += "2"
        elif abs(pixel[0] - 81) < 10 and abs(pixel[1] - 233) < 10 and abs(pixel[2] - 24) < 10:
            output +=  ""
        elif abs(pixel[0] - 129) < 10 and abs(pixel[1] - 30) < 10 and abs(pixel[2] - 159) < 10:
            output += "3"
        elif abs(pixel[0] - 180) < 10 and abs(pixel[1] - 74) < 10 and abs(pixel[2] - 192) < 10:
            output += "p"
        elif abs(pixel[0] - 255) < 10 and abs(pixel[1] - 153) < 10 and abs(pixel[2] - 17) < 10:
            output += "4"
        elif abs(pixel[0] - 156) < 10 and abs(pixel[1] - 105) < 10 and abs(pixel[2] - 3) < 10:
            output += "5"
        elif abs(pixel[0] - 0) < 10 and abs(pixel[1] - 0) < 10 and abs(pixel[2] - 0) < 10:
            output += "q"
        elif abs(pixel[0] - 137) < 10 and abs(pixel[1] - 141) < 10 and abs(pixel[2] - 144) < 10:
            output += "x"
        elif abs(pixel[0] - 212) < 10 and abs(pixel[1] - 215) < 10 and abs(pixel[2] - 217) < 10:
            output += "6"
        elif abs(pixel[0] - 255) < 10 and abs(pixel[1] - 255) < 10 and abs(pixel[2] - 255) < 10:
            output += "W"
        else: 
            print("HELP", pixel)
    output = output + "\n"

print (output)