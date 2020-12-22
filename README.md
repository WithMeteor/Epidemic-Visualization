# Epidemic-Visualization
A visualization work of COVID-19

## Introduction
This work mainly involves three modules: epidemic infection analysis, population activity overview and public opinion monitoring. A large number of real-time and effective epidemic data and public opinion data collected from Microblog, Baidu, CCTV news, other major platforms in China will be displayed through friendly and intuitive visualization charts after data processing and mining.

## Charts

### Map chart
The map shows China's novel coronavirus in different provinces and cities. The depth of color patches on the map can directly show the severity of the epidemic in different provinces and cities. Through the dynamic demonstration of the time axis, we can observe the changes of the epidemic situation from January 20 to march from the beginning, transmission, outbreak and control. At the same time, you can click on the map to observe the evolution of the epidemic situation in each province, so as to further understand the development of the epidemic situation in each province. As the core chart of visualization part, epidemic map can realize linkage with other charts and display epidemic information from multiple angles. In the visualization method, we use the map drill down mode, which can focus from the national map to the provincial and municipal map. The provincial map can also be Click To observe the epidemic situation of each city through linkage with other charts, or click the button to return to the national map to observe the epidemic information of other provinces and cities.

### Dynamic-bar chart
The dynamic change chart shows the dynamic changes of the number of new people in each province every day. In order to clearly show the dynamic changes outside Hubei Province, we set the maximum number of people on the number axis to 300. When the number of new people exceeds 300, the specific number of people is indicated with a label, rather than completely displayed. This chart can be linked with the epidemic map to observe the dynamic new ranking of cities in the province. After playing to the latest date, the chart will automatically stop. If you need to play it again, you can click the refresh button.

### Calendar chart
By combining the calendar chart with the pie chart, the epidemic calendar chart specifically shows the proportion of daily confirmed, cured and dead people. It can also realize the linkage with the epidemic map. In order to prevent showing too much data at one time, our view only shows the epidemic situation of one month, and the month can be switched through the page turning button. The pie chart can show the proportion of three types of people in each city.

### Scatter chart
The scatter plot of novel coronavirus pneumonia / mortality rate shows the specific distribution of cure rate and mortality rate of new crown pneumonia in various provinces and cities. At the same time, the depth of each color represents the number of confirmed cases. At the same time, the scatter map can achieve linkage with epidemic map.

#### Line chart
The newly added number curve shows the changes of the number of confirmed, cured and dead people over time. In order to grasp the epidemic situation more clearly, we distinguish two situations inside and outside Hubei Province, and the broken line chart can specifically show the changes of the number of people in three categories in each city

### Prediction chart
Novel coronavirus pneumonia models were predicted and modeled according to the model. The new model was predicted by the model of The Hidden Geometry of Complex, Network-Driven Contagion Phenomena, which was adjusted by the method of Hidden Geometry of Complex, Network-Driven Contagion Phenomena. According to the model, the new crown pneumonia epidemic in Wuhan will be completely controlled from the start date of January 10th.

### Migration chart
In order to show the real-time migration situation of Hubei Province in time dimension, we obtained Baidu population migration data, and compared the immigration and emigration situation with days as the minimum time unit. Through the method of date selection, we can flexibly compare the situation of moving in and out of any two days.

### Wordcloud chart
The data of this view are mainly divided into domestic hot search data, including micro-blog, tiktok and other hot search lists. Using the data mining methods of segmentation and topic word extraction, the specific keywords are obtained.

### Polar chart
The visualization method uses a radial stacked column chart, in which each sector corresponds to a topic. The radial length of red, black and blue in the fan area represents the number of negative, neutral and positive comments on the topic.
