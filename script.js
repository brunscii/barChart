// import d3 from  'd3.v7.min.js'

const d3 = window.d3



function printData( data ) {
        
        const margin = 50
        const height = 500;
        const width = 1000;

        var graph = d3.select('#graph')
        .attr('background-color', 'blue')

        var svg = graph.append('svg')
                .attr('width', width+100)
                .attr('height', height+100)
                .style('background-color', '#777')

        var tooltip = d3.select('#graph')
                .append('div')
                .attr('id', 'tooltip')
                .style('opacity', '0')
                .style('left', '0')
                .style('top', '0')

        function earliest( date1, date2 ) {
                if( new Date( date1 ) < new Date( date2 ) ){
                        return true;
                }
                return false;
        }

        var xScale = d3.scaleTime()
        .domain( [
                new Date( data.data.reduce( (min, d)=> min = earliest( min, d[0] ) ? min : d[0], data.data[0][0]  ) ) ,
                new Date( data.data.reduce( (max, d)=> max = earliest( d[0], max ) ? max : d[0], data.data[0][0] ) )  
        ] )
        .range([0 , width ])


        // console.log( new Date( data.data.reduce( (min,d)=> min = earliest( min, d[0] ) ? min : d[0], data.data[0][0]  ) ) )

        // console.log(new Date( data.data.reduce( (max, d)=> max = earliest( d[0], max ) ? max : d[0] ,data.data[0][0] ) ) )

        // console.log( new Date( data.data[0][0]  ) )

        // console.log( new Date( data.data[0][0] ) < new Date( data.data[0][1] ) )
        // console.log( earliest( data.data[0][0], data.data[0][1] ) )
// 
        var xAxis = d3.axisBottom()
                .scale(xScale)

        svg.append('g')
                .call(xAxis)
                .attr('id', 'x-axis')
                .attr('transform', 'translate(40, 560)')

        var yScale = d3.scaleLinear()
                .domain([0, data.data.reduce( (max,d)=> max = (max <= d[1]) ? d[1] : max ,0) ])
                .range([margin, height + margin])

        const yAxis = d3.axisLeft(yScale)
                // .orient('left')
        
        data.data.map(d => console.log( yScale(d[1]) ))

        svg.append('g')
        .attr('id','y-axis')
        .call(yAxis)
        .attr('transform', 'translate(40, 0)')


        // This is where we addd the bars to the chart
        // we need a data-attribute for the value so we
        // can pull it up on :hover
        svg.selectAll('rect')
                .data(data.data)
                .enter()
                .append('rect')
                .attr('x', d => xScale(new Date( d[0] ) ) + margin )
                .attr('y', d=> (height + margin) - (yScale( d[1] ) - margin) )
                .attr('width', 1 )
                .attr('height', d => yScale( d[1] ) -margin )
                .attr('fill', '#339')
                .attr('data-date', (d) => d[0] )
                .attr('data-gdp', (d) => d[1] )
                .attr('class','bar')
                .on('mouseenter', (e) => {
                        d3.select(e.target).attr("fill",'red')

                        // e.srcElement.attr('fill','red')

                        tooltip.transition()
                                .duration(20)
                                .style('opacity',1)
                                .style('left', `${e.x + 10}px` )
                                .style('top', `${e.y + 20}px` )
                                .text(`[ ${e.srcElement.dataset.date}, ${e.srcElement.dataset.gdp} ]`)
                })
                .on('mouseout', (e) => {
                        // console.log(e)
                        d3.select(e.target).attr("fill",'#339')

                        tooltip.transition()
                                .duration(20)
                                .style('opacity',0)
                                
                })
                

        // data.data.map( (d) => {
        //         console.log(d[0])
        // })
        // console.log( data.data[0][0] )        


        

       console.log(data.data)
}

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(data => {
                printData(data)})

/*{errors: {…}, id: 120140, source_name: 'Federal Reserve Economic Data', source_code: 'FRED', code: 'GDP', …}
code
: 
"GDP"
column_names
: 
(2) ['DATE', 'VALUE']
data
: 
Array(275)
[0 … 99]
0
: 
(2) ['1947-01-01', 243.1]
1
: 
(2) ['1947-04-01', 246.3]
2
: 
(2) ['1947-07-01', 250.1]
3
: 
(2) ['1947-10-01', 260.3]
4
: 
(2) ['1948-01-01', 266.2]
5
: 
(2) ['1948-04-01', 272.9]
6
: 
(2) ['1948-07-01', 279.5]
7
: 
(2) ['1948-10-01', 280.7]
8
: 
(2) ['1949-01-01', 275.4]
9
: 
(2) ['1949-04-01', 271.7]
10
: 
(2) ['1949-07-01', 273.3]
11
: 
(2) ['1949-10-01', 271]
12
: 
(2) ['1950-01-01', 281.2]
13
: 
(2) ['1950-04-01', 290.7]
14
: 
(2) ['1950-07-01', 308.5]
15
: 
(2) ['1950-10-01', 320.3]
16
: 
(2) ['1951-01-01', 336.4]
17
: 
(2) ['1951-04-01', 344.5]
18
: 
(2) ['1951-07-01', 351.8]
19
: 
(2) ['1951-10-01', 356.6]
20
: 
(2) ['1952-01-01', 360.2]
21
: 
(2) ['1952-04-01', 361.4]
22
: 
(2) ['1952-07-01', 368.1]
23
: 
(2) ['1952-10-01', 381.2]
24
: 
(2) ['1953-01-01', 388.5]
25
: 
(2) ['1953-04-01', 392.3]
26
: 
(2) ['1953-07-01', 391.7]
27
: 
(2) ['1953-10-01', 386.5]
28
: 
(2) ['1954-01-01', 385.9]
29
: 
(2) ['1954-04-01', 386.7]
30
: 
(2) ['1954-07-01', 391.6]
31
: 
(2) ['1954-10-01', 400.3]
32
: 
(2) ['1955-01-01', 413.8]
33
: 
(2) ['1955-04-01', 422.2]
34
: 
(2) ['1955-07-01', 430.9]
35
: 
(2) ['1955-10-01', 437.8]
36
: 
(2) ['1956-01-01', 440.5]
37
: 
(2) ['1956-04-01', 446.8]
38
: 
(2) ['1956-07-01', 452]
39
: 
(2) ['1956-10-01', 461.3]
40
: 
(2) ['1957-01-01', 470.6]
41
: 
(2) ['1957-04-01', 472.8]
42
: 
(2) ['1957-07-01', 480.3]
43
: 
(2) ['1957-10-01', 475.7]
44
: 
(2) ['1958-01-01', 468.4]
45
: 
(2) ['1958-04-01', 472.8]
46
: 
(2) ['1958-07-01', 486.7]
47
: 
(2) ['1958-10-01', 500.4]
48
: 
(2) ['1959-01-01', 511.1]
49
: 
(2) ['1959-04-01', 524.2]
50
: 
(2) ['1959-07-01', 525.2]
51
: 
(2) ['1959-10-01', 529.3]
52
: 
(2) ['1960-01-01', 543.3]
53
: 
(2) ['1960-04-01', 542.7]
54
: 
(2) ['1960-07-01', 546]
55
: 
(2) ['1960-10-01', 541.1]
56
: 
(2) ['1961-01-01', 545.9]
57
: 
(2) ['1961-04-01', 557.4]
58
: 
(2) ['1961-07-01', 568.2]
59
: 
(2) ['1961-10-01', 581.6]
60
: 
(2) ['1962-01-01', 595.2]
61
: 
(2) ['1962-04-01', 602.6]
62
: 
(2) ['1962-07-01', 609.6]
63
: 
(2) ['1962-10-01', 613.1]
64
: 
(2) ['1963-01-01', 622.7]
65
: 
(2) ['1963-04-01', 631.8]
66
: 
(2) ['1963-07-01', 645]
67
: 
(2) ['1963-10-01', 654.8]
68
: 
(2) ['1964-01-01', 671.1]
69
: 
(2) ['1964-04-01', 680.8]
70
: 
(2) ['1964-07-01', 692.8]
71
: 
(2) ['1964-10-01', 698.4]
72
: 
(2) ['1965-01-01', 719.2]
73
: 
(2) ['1965-04-01', 732.4]
74
: 
(2) ['1965-07-01', 750.2]
75
: 
(2) ['1965-10-01', 773.1]
76
: 
(2) ['1966-01-01', 797.3]
77
: 
(2) ['1966-04-01', 807.2]
78
: 
(2) ['1966-07-01', 820.8]
79
: 
(2) ['1966-10-01', 834.9]
80
: 
(2) ['1967-01-01', 846]
81
: 
(2) ['1967-04-01', 851.1]
82
: 
(2) ['1967-07-01', 866.6]
83
: 
(2) ['1967-10-01', 883.2]
84
: 
(2) ['1968-01-01', 911.1]
85
: 
(2) ['1968-04-01', 936.3]
86
: 
(2) ['1968-07-01', 952.3]
87
: 
(2) ['1968-10-01', 970.1]
88
: 
(2) ['1969-01-01', 995.4]
89
: 
(2) ['1969-04-01', 1011.4]
90
: 
(2) ['1969-07-01', 1032]
91
: 
(2) ['1969-10-01', 1040.7]
92
: 
(2) ['1970-01-01', 1053.5]
93
: 
(2) ['1970-04-01', 1070.1]
94
: 
(2) ['1970-07-01', 1088.5]
95
: 
(2) ['1970-10-01', 1091.5]
96
: 
(2) ['1971-01-01', 1137.8]
97
: 
(2) ['1971-04-01', 1159.4]
98
: 
(2) ['1971-07-01', 1180.3]
99
: 
(2) ['1971-10-01', 1193.6]
[100 … 199]
100
: 
(2) ['1972-01-01', 1233.8]
101
: 
(2) ['1972-04-01', 1270.1]
102
: 
(2) ['1972-07-01', 1293.8]
103
: 
(2) ['1972-10-01', 1332]
104
: 
(2) ['1973-01-01', 1380.7]
105
: 
(2) ['1973-04-01', 1417.6]
106
: 
(2) ['1973-07-01', 1436.8]
107
: 
(2) ['1973-10-01', 1479.1]
108
: 
(2) ['1974-01-01', 1494.7]
109
: 
(2) ['1974-04-01', 1534.2]
110
: 
(2) ['1974-07-01', 1563.4]
111
: 
(2) ['1974-10-01', 1603]
112
: 
(2) ['1975-01-01', 1619.6]
113
: 
(2) ['1975-04-01', 1656.4]
114
: 
(2) ['1975-07-01', 1713.8]
115
: 
(2) ['1975-10-01', 1765.9]
116
: 
(2) ['1976-01-01', 1824.5]
117
: 
(2) ['1976-04-01', 1856.9]
118
: 
(2) ['1976-07-01', 1890.5]
119
: 
(2) ['1976-10-01', 1938.4]
120
: 
(2) ['1977-01-01', 1992.5]
121
: 
(2) ['1977-04-01', 2060.2]
122
: 
(2) ['1977-07-01', 2122.4]
123
: 
(2) ['1977-10-01', 2168.7]
124
: 
(2) ['1978-01-01', 2208.7]
125
: 
(2) ['1978-04-01', 2336.6]
126
: 
(2) ['1978-07-01', 2398.9]
127
: 
(2) ['1978-10-01', 2482.2]
128
: 
(2) ['1979-01-01', 2531.6]
129
: 
(2) ['1979-04-01', 2595.9]
130
: 
(2) ['1979-07-01', 2670.4]
131
: 
(2) ['1979-10-01', 2730.7]
132
: 
(2) ['1980-01-01', 2796.5]
133
: 
(2) ['1980-04-01', 2799.9]
134
: 
(2) ['1980-07-01', 2860]
135
: 
(2) ['1980-10-01', 2993.5]
136
: 
(2) ['1981-01-01', 3131.8]
137
: 
(2) ['1981-04-01', 3167.3]
138
: 
(2) ['1981-07-01', 3261.2]
139
: 
(2) ['1981-10-01', 3283.5]
140
: 
(2) ['1982-01-01', 3273.8]
141
: 
(2) ['1982-04-01', 3331.3]
142
: 
(2) ['1982-07-01', 3367.1]
143
: 
(2) ['1982-10-01', 3407.8]
144
: 
(2) ['1983-01-01', 3480.3]
145
: 
(2) ['1983-04-01', 3583.8]
146
: 
(2) ['1983-07-01', 3692.3]
147
: 
(2) ['1983-10-01', 3796.1]
148
: 
(2) ['1984-01-01', 3912.8]
149
: 
(2) ['1984-04-01', 4015]
150
: 
(2) ['1984-07-01', 4087.4]
151
: 
(2) ['1984-10-01', 4147.6]
152
: 
(2) ['1985-01-01', 4237]
153
: 
(2) ['1985-04-01', 4302.3]
154
: 
(2) ['1985-07-01', 4394.6]
155
: 
(2) ['1985-10-01', 4453.1]
156
: 
(2) ['1986-01-01', 4516.3]
157
: 
(2) ['1986-04-01', 4555.2]
158
: 
(2) ['1986-07-01', 4619.6]
159
: 
(2) ['1986-10-01', 4669.4]
160
: 
(2) ['1987-01-01', 4736.2]
161
: 
(2) ['1987-04-01', 4821.5]
162
: 
(2) ['1987-07-01', 4900.5]
163
: 
(2) ['1987-10-01', 5022.7]
164
: 
(2) ['1988-01-01', 5090.6]
165
: 
(2) ['1988-04-01', 5207.7]
166
: 
(2) ['1988-07-01', 5299.5]
167
: 
(2) ['1988-10-01', 5412.7]
168
: 
(2) ['1989-01-01', 5527.4]
169
: 
(2) ['1989-04-01', 5628.4]
170
: 
(2) ['1989-07-01', 5711.6]
171
: 
(2) ['1989-10-01', 5763.4]
172
: 
(2) ['1990-01-01', 5890.8]
173
: 
(2) ['1990-04-01', 5974.7]
174
: 
(2) ['1990-07-01', 6029.5]
175
: 
(2) ['1990-10-01', 6023.3]
176
: 
(2) ['1991-01-01', 6054.9]
177
: 
(2) ['1991-04-01', 6143.6]
178
: 
(2) ['1991-07-01', 6218.4]
179
: 
(2) ['1991-10-01', 6279.3]
180
: 
(2) ['1992-01-01', 6380.8]
181
: 
(2) ['1992-04-01', 6492.3]
182
: 
(2) ['1992-07-01', 6586.5]
183
: 
(2) ['1992-10-01', 6697.6]
184
: 
(2) ['1993-01-01', 6748.2]
185
: 
(2) ['1993-04-01', 6829.6]
186
: 
(2) ['1993-07-01', 6904.2]
187
: 
(2) ['1993-10-01', 7032.8]
188
: 
(2) ['1994-01-01', 7136.3]
189
: 
(2) ['1994-04-01', 7269.8]
190
: 
(2) ['1994-07-01', 7352.3]
191
: 
(2) ['1994-10-01', 7476.7]
192
: 
(2) ['1995-01-01', 7545.3]
193
: 
(2) ['1995-04-01', 7604.9]
194
: 
(2) ['1995-07-01', 7706.5]
195
: 
(2) ['1995-10-01', 7799.5]
196
: 
(2) ['1996-01-01', 7893.1]
197
: 
(2) ['1996-04-01', 8061.5]
198
: 
(2) ['1996-07-01', 8159]
199
: 
(2) ['1996-10-01', 8287.1]
[200 … 274]
200
: 
(2) ['1997-01-01', 8402.1]
201
: 
(2) ['1997-04-01', 8551.9]
202
: 
(2) ['1997-07-01', 8691.8]
203
: 
(2) ['1997-10-01', 8788.3]
204
: 
(2) ['1998-01-01', 8889.7]
205
: 
(2) ['1998-04-01', 8994.7]
206
: 
(2) ['1998-07-01', 9146.5]
207
: 
(2) ['1998-10-01', 9325.7]
208
: 
(2) ['1999-01-01', 9447.1]
209
: 
(2) ['1999-04-01', 9557]
210
: 
(2) ['1999-07-01', 9712.3]
211
: 
(2) ['1999-10-01', 9926.1]
212
: 
(2) ['2000-01-01', 10031]
213
: 
(2) ['2000-04-01', 10278.3]
214
: 
(2) ['2000-07-01', 10357.4]
215
: 
(2) ['2000-10-01', 10472.3]
216
: 
(2) ['2001-01-01', 10508.1]
217
: 
(2) ['2001-04-01', 10638.4]
218
: 
(2) ['2001-07-01', 10639.5]
219
: 
(2) ['2001-10-01', 10701.3]
220
: 
(2) ['2002-01-01', 10834.4]
221
: 
(2) ['2002-04-01', 10934.8]
222
: 
(2) ['2002-07-01', 11037.1]
223
: 
(2) ['2002-10-01', 11103.8]
224
: 
(2) ['2003-01-01', 11230.1]
225
: 
(2) ['2003-04-01', 11370.7]
226
: 
(2) ['2003-07-01', 11625.1]
227
: 
(2) ['2003-10-01', 11816.8]
228
: 
(2) ['2004-01-01', 11988.4]
229
: 
(2) ['2004-04-01', 12181.4]
230
: 
(2) ['2004-07-01', 12367.7]
231
: 
(2) ['2004-10-01', 12562.2]
232
: 
(2) ['2005-01-01', 12813.7]
233
: 
(2) ['2005-04-01', 12974.1]
234
: 
(2) ['2005-07-01', 13205.4]
235
: 
(2) ['2005-10-01', 13381.6]
236
: 
(2) ['2006-01-01', 13648.9]
237
: 
(2) ['2006-04-01', 13799.8]
238
: 
(2) ['2006-07-01', 13908.5]
239
: 
(2) ['2006-10-01', 14066.4]
240
: 
(2) ['2007-01-01', 14233.2]
241
: 
(2) ['2007-04-01', 14422.3]
242
: 
(2) ['2007-07-01', 14569.7]
243
: 
(2) ['2007-10-01', 14685.3]
244
: 
(2) ['2008-01-01', 14668.4]
245
: 
(2) ['2008-04-01', 14813]
246
: 
(2) ['2008-07-01', 14843]
247
: 
(2) ['2008-10-01', 14549.9]
248
: 
(2) ['2009-01-01', 14383.9]
249
: 
(2) ['2009-04-01', 14340.4]
250
: 
(2) ['2009-07-01', 14384.1]
251
: 
(2) ['2009-10-01', 14566.5]
252
: 
(2) ['2010-01-01', 14681.1]
253
: 
(2) ['2010-04-01', 14888.6]
254
: 
(2) ['2010-07-01', 15057.7]
255
: 
(2) ['2010-10-01', 15230.2]
256
: 
(2) ['2011-01-01', 15238.4]
257
: 
(2) ['2011-04-01', 15460.9]
258
: 
(2) ['2011-07-01', 15587.1]
259
: 
(2) ['2011-10-01', 15785.3]
260
: 
(2) ['2012-01-01', 15973.9]
261
: 
(2) ['2012-04-01', 16121.9]
262
: 
(2) ['2012-07-01', 16227.9]
263
: 
(2) ['2012-10-01', 16297.3]
264
: 
(2) ['2013-01-01', 16440.7]
265
: 
(2) ['2013-04-01', 16526.8]
266
: 
(2) ['2013-07-01', 16727.5]
267
: 
(2) ['2013-10-01', 16957.6]
268
: 
(2) ['2014-01-01', 16984.3]
269
: 
(2) ['2014-04-01', 17270]
270
: 
(2) ['2014-07-01', 17522.1]
271
: 
(2) ['2014-10-01', 17615.9]
272
: 
(2) ['2015-01-01', 17649.3]
273
: 
(2) ['2015-04-01', 17913.7]
274
: 
(2) ['2015-07-01', 18064.7]
length
: 
275
[[Prototype]]
: 
Array(0)
description
: 
"Units: Billions of Dollars\nSeasonal Adjustment: Seasonally Adjusted Annual Rate\nNotes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)"
display_url
: 
"http://research.stlouisfed.org/fred2/data/GDP.txt"
errors
: 
{}
frequency
: 
"quarterly"
from_date
: 
"1947-01-01"
id
: 
120140
name
: 
"Gross Domestic Product, 1 Decimal"
premium
: 
false
private
: 
false
source_code
: 
"FRED"
source_name
: 
"Federal Reserve Economic Data"
to_date
: 
"2015-07-01"
type
: 
null
updated_at
: 
"2015-12-14T20:00:28.561Z"
urlize_name
: 
"Gross-Domestic-Product-1-Dec*/