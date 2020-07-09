import PIL
from PIL import Image
import os

height = 400

directory = "/srv/raiddisk/dev/pydev/cma/src/static/images"

for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        img = Image.open(directory+ '/'+ filename)
        hpercent = (height/float(img.size[1]))
        wsize = int((float(img.size[0])*float(hpercent)))
        img = img.resize((wsize,height), PIL.Image.ANTIALIAS)
        img.save('/srv/raiddisk/dev/pydev/cma/src/static/images/th400/' + filename)