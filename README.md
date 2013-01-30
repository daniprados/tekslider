<h1>Tekslider  a touch focused slider</h1>
	<div class="txt-contingut"><p>TekSlider</p>
<p>A touch focused slider. With acceleration and easily configurable. Now it is in beta phase and any feedback will be welcome.</p>
<p><a href="http://code.comunicatek.com/plugins/tekslider/index.html" target="_blank">A little demo</a>&nbsp;and <a href="http://code.comunicatek.com/plugins/tekslider/index2.html" target="_blank">another demo</a>.</p>
<p><br /><strong>A basic call</strong></p>
<pre><br />$("div.tekcontainer").TekSlider();</pre>
<p>And using Modernizr for touch event detection</p>
<pre><br />$("div.tekcontainer").TekSlider({touch:Modernizr.touch});</pre>
<p><br /><strong>The options of the plugin:</strong></p>
<ul>
<li><strong>touch</strong> : if false it use click events for move. If true use touch events for move.</li>
<li><strong>animation</strong> : if true make and animation after touch simulating an desacceleration, if false only moves with touch.</li>
<li><strong>accelerator</strong> : options for the accelerator component</li>
<ul>
<li>accel : pixels / second2 of acceleration</li>
<li>maxvel : max speed allowed for the animation</li>
<li>threshold : minimum speed needed to start and animation</li>
<li>stopthreshold : if the speed is under this value the animation will stop.</li>
<li>time : milliseconds for the timer. If 15, the animation will be executed every 15 milliseconds.</li>
</ul>

