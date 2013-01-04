##jQuery Loupe v1.3.4

For Usage Examples:
http://chrisiufer.com/loupe/


###Configurable Options

<table border="0" cellspacing="5" cellpadding="5">
		<tr><th>Property</th><th>Default</th><th></th></tr>
		<tr><td>width</td><td>200</td><td>loupe width</td></tr>
		<tr><td>height</td><td>200</td><td>loupe height</td></tr>
		<tr><td>margin</td><td>6</td><td>pixel margin aroudn the viewing area of the loupe</td></tr>
		<tr><td>cursorOffsetX</td><td>10</td><td>horizontal distance from the cursor</td></tr>
		<tr><td>cursorOffsetY</td><td>10</td><td>vertical distance from the cursor</td></tr>
		<tr><td><s>color</s></td><td><s>false</s></td><td>deprecated in 1.3.1. use backgroundColor or borderColor instead</td></tr>
		<tr><td>borderColor</td><td>'#999'</td><td>border color</td></tr>
		<tr><td>backgroundColor</td><td>'#fff'</td><td>background color of the negative space around the zoomed image</td></tr>
		<tr><td>radiusLT</td><td>0</td><td>left top radius</td></tr>
		<tr><td>radiusLB</td><td>100</td><td>left bottom radius</td></tr>
		<tr><td>radiusRT</td><td>100</td><td>right top radius</td></tr>
		<tr><td>radiusRB</td><td>100</td><td>right bottom radius</td></tr>
		<tr><td>image</td><td>false</td><td>background image url</td></tr>
		<tr><td>repeat</td><td>false</td><td>enable or disable repeating background image</td></tr>
		<tr><td>fade</td><td>true</td><td>use fade in/out</td></tr>
		<tr><td>fadeIn</td><td>true</td><td>fade in time (ms)</td></tr>
		<tr><td>fadeOut</td><td>true</td><td>fade out time (ms)</td></tr>
	</table>


###Change Log
<table border="0" cellspacing="5" cellpadding="5">
		<tr><th>Version</th><th></th></tr>
		<tr><td>V 1.3.4 Added data-original attribute via @sandstrom. Code cleanup.</td></tr>
		<tr><td>V 1.3.2</td><td>Updated to work with jQuery 1.6 by changing attr() calls to prop().</td></tr>
		<tr><td>V 1.3.3</td><td>Merged changes from jpcaruana to make start, stop, and move handlers easier to access.</td></tr>
	</table>	




This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>