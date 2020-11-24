export function rotate({x: cx, y: cy}, {x: px, y: py}, rad) {
    let [ax, ay] = [px - cx, py - cy];
    let [dx, dy] = [Math.cos(rad) * ax + Math.sin(rad) * ay, -Math.sin(rad) * ax + Math.cos(rad) * ay]
    return {x: cx + dx, y: cy + dy};
}

export function translation({x: ax, y: ay}, {x: px, y: py}, distance) {
    let [_x, _y] = [px - ax, py - ay];
    let d = Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2));
    let [dx, dy] = [distance / d * _x, distance / d * _y];
    return {x: ax + dx, y: ay + dy};
}

export function getIntersectionOnCircle({x: from_x, y: from_y}, {x: to_x, y: to_y}, r) {

    let d = Math.sqrt(Math.pow(to_x - from_x, 2) + Math.pow(to_y - from_y, 2))

    let cos = (to_x - from_x) / d
    let sin = (to_y - from_y) / d

    let [_x, _y] = [r * cos, r * sin]

    return {
        from: {
            x: _x + from_x,
            y: _y + from_y
        },
        to: {
            x: to_x - _x,
            y: to_y - _y
        }
    };
}