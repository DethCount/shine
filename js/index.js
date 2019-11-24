let color = (r, g, b, a) => {
    return 'rgb' + (undefined === a ? '' : 'a') + '('
        + (r || 0) + ','
        + (g || 0) + ','
        + (b || 0)
        + (undefined === a ? '' : ',' + a)
        + ')';
};

$(function(){
    let canvas = $('#screen')
        .attr('width', $('body').innerWidth())
        .attr('height', $('body').innerHeight())
        .get(0);

    let ctxt = canvas.getContext('2d');

    ctxt.translate(Math.round(canvas.width/2), Math.round(canvas.height/2));

    let maxLen = 11;
    let r = Math.min(canvas.width/30, canvas.height/30);
    let a = 0.5;

    let circles = [
        new Circle(
            255,
            255,
            255,
            1,
            0,
            0,
            2.5*r
        )
    ];

    for (var i = 0; i < maxLen; i++) {
        let theta = -(Math.PI * 2 * i) / maxLen;
        let cosTheta = Math.cos(theta);
        let sinTheta = Math.sin(theta);
        let pos = (new Vector2(r, 0))
            .multiply(new Matrix2(
                new Vector2(cosTheta, sinTheta),
                new Vector2(-sinTheta, cosTheta)
            ));

        circles.push(new Circle(
            i == 0 || i == 1 || i == 5 ? 255 : 0,
            i == 2 || i == 1 || i == 3 ? 255 : 0,
            i == 3 || i == 4 || i == 5 ? 255 : 0,
            a,
            pos.x,
            pos.y,
            1.25 * r
        ));
    }

    let lastTime = 0;
    let bgColor = 0;
    let update = (t, dt) => {
        //return;
        //bgColor = Math.round(Math.cos(t/1000) * 128) + 128;
        /*
        a = 0.5 * Math.sin(t/100) + 0.5;
        // console.log(bgColor, a);

        for (var i = 0; i < circles.length; i++) {
            circles[i].a = a;
        }*/

        let len = circles.length;

        if (t - lastTime > 1000 && len < maxLen * (maxLen + 1)) {
            lastTime = t;
            for (var i = len - maxLen; i < len; i++) {
                var nextIdx = i == len - 1 ? (len - maxLen) : i + 1;

                circles.push(new Circle(
                    Math.round((circles[i].r + circles[nextIdx].r) / 2),
                    Math.round((circles[i].g + circles[nextIdx].g) / 2),
                    Math.round((circles[i].b + circles[nextIdx].b) / 2),
                    a,
                    1 * (circles[i].x + circles[nextIdx].x),
                    1 * (circles[i].y + circles[nextIdx].y),
                    0.25 * (circles[i].R + circles[nextIdx].R)
                ));
            }
        }
    };


    let render = (ctxt, t, dt) => {
        ctxt.fillStyle = color(bgColor, bgColor, bgColor, a);
        ctxt.fillRect(-Math.round(canvas.width/2), -Math.round(canvas.height/2), ctxt.canvas.width, ctxt.canvas.height);

        for (var i = 0; i < circles.length; i++) {
            circles[i].render(ctxt);
        }
    };

    let animate = (lastTime) => {
        lastTime = lastTime || (new Date()).getTime();
        let t = (new Date()).getTime();
        let dt = t - lastTime;

        update(t, dt);
        render(ctxt, t, dt);

        requestAnimationFrame(animate.bind(this, t));
    };

    animate();
});
