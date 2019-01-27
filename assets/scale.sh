
for f in *.png ; do
    #w=$(file background.png | cut -f7 -d" " | cut -f1 -d,)
    #w=$(expr $w \* 5)
    #convert $f -scale x$w scaled/$f
    convert $f -scale 500% scaled/$f
done