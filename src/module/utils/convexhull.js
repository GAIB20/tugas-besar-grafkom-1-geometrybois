// -1: counterClockwise
// 0: collinear
// 1: Clockwise
function tripletOrientation(p, q, r)
{
    // 
	let val = (q.y - p.y) * (r.x - q.x) -
				(q.x - p.x) * (r.y - q.y);
		
		if (val == 0) return 0; // collinear
		return (val > 0)? 1: -1; // clock or counterclock wise
}

function convexHull(points)
{
    const n = points.length;
    // There must be at least 3 points (polygon)
    if (n< 3) return;
    
    // Initialize Result
    let hull = [];
    
    // Find the leftmost point
    let leftmost = 0;
    for (let i = 1; i < n; i++){
        if (points[i].x < points[leftmost].x){
            leftmost = i;
        }
    }
    
    // Start from leftmost point, keep moving counter clock-wise until reach the start point again.
    let p = leftmost, q;
    do
    {
        // Add current point to result
        hull.push(points[p]);
    
        // Keep track the last visited is the most counter clock-wise
        q = (p + 1) % n;
        
        for (let i = 0; i < n; i++)
        {
        // If i is more counterclockwise than current q, then update q
            if (tripletOrientation(points[p], points[i], points[q])== -1)
                q = i;
            }
    
        // set p for next iteration
        p = q;
    } while (p != leftmost); // Repeat while p is not the first point

    return hull;
}

export default convexHull;