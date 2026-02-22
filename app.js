/* 
    =============================================================================
    STOCK ANALYSIS DASHBOARD - JAVASCRIPT
    =============================================================================
    This file contains all JavaScript functionality for the stock analysis dashboard.
    It handles data parsing, chart rendering, technical indicator calculations,
    and user interactions.
    
    TABLE OF CONTENTS:
    1. Stock Data (CSV format)
    2. Global Variables & State
    3. Data Parsing Functions
    4. Initialization
    5. Time Range Switching
    6. Chart Type Switching
    7. Indicator Toggling
    8. Statistics Update
    9. Technical Indicator Calculations
    10. Chart Rendering
    11. Window Resize Handler
    12. Indicator Legend Update
    
    =============================================================================
*/

/* -----------------------------------------------------------------------------
   1. STOCK DATA (CSV FORMAT)
   ----------------------------------------------------------------------------- */
/* 
   Stock data stored as CSV strings for three different time ranges.
   Each row contains: Date, Price (Close), Open, High, Low, Volume, Change %
   Data is for Reliance Power (RPOWER) stock on NSE
*/

/* Daily stock data - from RPOL Historical Data Day.csv */
const dayCSV = `Date,Price,Open,High,Low,Vol.,Change %
13-02-2026,26.80,27.41,27.42,26.70,24.37M,-2.93%
12-02-2026,27.61,27.75,27.80,27.13,23.12M,-0.90%
11-02-2026,27.86,28.55,28.58,27.73,29.50M,-2.11%
10-02-2026,28.46,28.50,29.45,28.25,33.12M,0.11%
09-02-2026,28.43,28.50,28.85,27.86,37.95M,1.61%
06-02-2026,27.98,27.85,28.09,27.30,36.27M,-0.50%
05-02-2026,28.12,29.14,29.18,27.86,57.78M,-2.83%
04-02-2026,28.94,27.96,31.90,27.68,254.95M,2.73%
03-02-2026,28.17,28.20,28.40,27.14,46.51M,5.03%
02-02-2026,26.82,27.20,27.29,25.92,51.17M,-1.61%
01-02-2026,27.26,28.30,28.30,27.11,19.78M,-3.50%
30-01-2026,28.25,27.77,28.70,27.10,49.79M,1.73%
29-01-2026,27.77,29.70,29.96,27.61,46.97M,-5.54%
28-01-2026,29.40,27.81,29.68,27.55,63.74M,7.18%
27-01-2026,27.43,28.00,28.50,26.83,59.31M,-2.97%
23-01-2026,28.27,30.40,30.40,28.00,54.02M,-5.67%
22-01-2026,29.97,30.04,30.39,29.43,28.52M,1.22%
21-01-2026,29.61,30.00,30.38,29.40,58.17M,-1.07%
20-01-2026,29.93,31.25,31.37,29.75,49.69M,-3.79%
19-01-2026,31.11,31.98,32.14,31.00,35.06M,-2.42%
16-01-2026,31.88,31.57,32.65,31.57,45.35M,-3.92%
14-01-2026,33.18,33.40,33.80,33.02,18.41M,-0.84%
13-01-2026,33.46,33.90,34.22,33.14,39.00M,0.15%
12-01-2026,33.41,33.88,33.88,32.63,30.50M,-1.39%
09-01-2026,33.88,34.24,34.69,33.70,25.56M,-1.34%
08-01-2026,34.34,35.02,35.28,34.20,19.61M,-1.94%
07-01-2026,35.02,35.17,35.24,34.75,14.89M,-0.37%
06-01-2026,35.15,35.85,35.97,35.04,19.16M,-1.95%
05-01-2026,35.85,35.93,36.41,35.12,27.31M,-0.22%
02-01-2026,35.93,34.79,36.20,34.65,38.88M,3.49%
01-01-2026,34.72,35.36,35.52,34.55,27.72M,-0.37%
31-12-2025,34.85,34.00,35.20,33.93,46.88M,3.54%
30-12-2025,33.66,35.70,35.70,33.35,99.22M,-4.65%
29-12-2025,35.30,36.55,36.95,35.10,40.80M,-3.39%
26-12-2025,36.54,38.35,38.55,36.26,50.05M,-4.25%
24-12-2025,38.16,36.29,38.70,36.14,79.20M,5.18%
23-12-2025,36.28,35.45,36.89,34.59,81.29M,2.83%
22-12-2025,35.28,38.30,38.31,35.00,87.98M,-8.51%
19-12-2025,38.56,38.00,38.85,37.68,52.17M,2.06%
18-12-2025,37.78,36.19,39.39,35.69,150.05M,5.86%
17-12-2025,35.69,34.83,37.43,34.50,137.65M,3.12%
16-12-2025,34.61,34.25,35.45,34.11,39.45M,0.76%
15-12-2025,34.35,34.31,35.07,34.03,33.82M,-0.52%
12-12-2025,34.53,34.05,34.70,33.66,36.92M,2.95%
11-12-2025,33.54,33.98,34.20,32.40,58.07M,-1.29%
10-12-2025,33.98,35.45,36.04,33.75,47.37M,-4.60%
09-12-2025,35.62,35.40,36.11,34.50,39.90M,0.62%
08-12-2025,35.40,37.00,37.20,35.11,47.51M,-6.05%
05-12-2025,37.68,38.29,38.30,37.40,15.69M,-1.31%
04-12-2025,38.18,38.80,38.90,37.93,19.76M,-0.60%
03-12-2025,38.41,38.76,39.06,38.05,19.04M,-1.26%
02-12-2025,38.90,38.81,39.62,38.45,23.04M,-0.05%
01-12-2025,38.92,39.86,40.13,38.80,21.12M,-2.58%
28-11-2025,39.95,40.00,40.49,39.21,39.22M,-0.65%
27-11-2025,40.21,40.00,40.80,39.51,65.44M,1.85%
26-11-2025,39.48,37.21,39.79,37.21,87.19M,6.13%
25-11-2025,37.20,37.00,37.86,36.83,30.13M,0.43%
24-11-2025,37.04,39.14,39.25,36.70,35.05M,-4.63%
21-11-2025,38.84,39.99,39.99,38.75,24.16M,-1.22%
20-11-2025,39.32,40.50,41.75,39.00,57.71M,-1.53%
19-11-2025,39.93,40.20,40.42,39.63,25.94M,-0.32%
18-11-2025,40.06,41.10,41.23,40.00,22.52M,-1.96%
17-11-2025,40.86,41.74,42.38,40.70,35.60M,-1.14%
14-11-2025,41.33,41.12,41.77,41.00,20.73M,0.17%
13-11-2025,41.26,41.88,42.59,41.00,42.50M,-1.08%
12-11-2025,41.71,41.70,42.87,41.50,48.74M,1.26%
11-11-2025,41.19,41.00,41.73,39.92,61.74M,0.22%
10-11-2025,41.10,39.20,42.30,38.00,107.66M,4.87%
07-11-2025,39.19,41.24,41.24,39.00,47.89M,-4.58%
06-11-2025,41.07,40.15,41.75,38.50,116.77M,0.86%
04-11-2025,40.72,43.02,43.37,40.40,89.47M,-7.22%
03-11-2025,43.89,46.00,46.58,43.05,71.98M,-5.45%
31-10-2025,46.42,46.30,47.60,45.60,33.05M,-0.28%
30-10-2025,46.55,45.94,47.75,45.60,37.97M,0.54%
29-10-2025,46.30,43.68,47.60,43.31,86.78M,6.00%
28-10-2025,43.68,44.70,45.09,43.27,19.64M,-2.13%
27-10-2025,44.63,45.15,45.73,44.50,18.89M,-1.26%
24-10-2025,45.20,45.30,45.35,44.80,12.84M,0.27%
23-10-2025,45.08,44.55,46.58,44.41,32.79M,1.58%
21-10-2025,44.38,44.16,44.80,44.16,4.19M,0.50%
20-10-2025,44.16,45.00,45.07,44.04,13.56M,-1.08%
17-10-2025,44.64,45.30,45.48,44.50,12.41M,-0.91%
16-10-2025,45.05,45.25,46.08,44.40,17.65M,0.36%
15-10-2025,44.89,45.00,46.40,44.40,28.90M,-0.47%
14-10-2025,45.10,46.56,46.71,44.71,25.30M,-2.42%
13-10-2025,46.22,43.55,47.51,43.55,82.07M,-4.86%
10-10-2025,48.58,44.10,50.73,44.10,119.82M,9.29%
09-10-2025,44.45,44.90,44.94,43.75,13.59M,-0.76%
08-10-2025,44.79,45.54,46.00,44.38,18.73M,0.52%
07-10-2025,44.56,45.00,45.29,44.40,10.62M,-1.74%
06-10-2025,45.35,46.20,46.60,45.15,10.25M,-2.43%
03-10-2025,46.48,45.88,47.40,45.22,18.24M,1.71%
01-10-2025,45.70,44.30,45.88,44.12,16.46M,3.02%
30-09-2025,44.36,45.39,45.78,44.11,9.96M,-1.18%
29-09-2025,44.89,45.02,45.98,44.18,15.37M,0.29%
26-09-2025,44.76,46.23,46.30,44.50,10.41M,-2.72%
25-09-2025,46.01,46.61,47.10,45.91,7.08M,-0.97%
24-09-2025,46.46,47.86,47.99,46.31,9.62M,-2.88%
23-09-2025,47.84,48.99,49.03,47.61,10.41M,-2.03%
22-09-2025,48.83,47.89,49.37,47.70,23.19M,1.64%
19-09-2025,48.04,47.55,48.25,46.57,20.86M,1.26%
18-09-2025,47.44,48.98,48.99,47.30,15.74M,-2.85%
17-09-2025,48.83,47.93,49.28,47.60,25.88M,1.88%
16-09-2025,47.93,45.89,47.93,45.77,47.95M,4.99%
15-09-2025,45.65,45.66,46.70,45.52,9.90M,-0.31%
12-09-2025,45.79,46.45,46.98,45.55,13.54M,-1.31%
11-09-2025,46.40,46.70,47.50,45.90,13.21M,-0.77%
10-09-2025,46.76,46.90,47.58,44.60,20.10M,0.28%
09-09-2025,46.63,46.39,46.94,45.60,11.78M,1.00%
08-09-2025,46.17,47.10,47.40,46.03,4.75M,-1.60%
05-09-2025,46.92,46.70,47.44,45.70,8.78M,1.06%
04-09-2025,46.43,48.25,48.48,45.66,7.18M,-2.76%
03-09-2025,47.75,46.98,48.34,46.67,17.39M,3.27%
02-09-2025,46.24,44.45,46.24,44.11,8.20M,5.00%
01-09-2025,44.04,44.50,44.90,43.55,8.16M,0.27%
29-08-2025,43.92,45.20,45.50,43.55,6.84M,-2.79%
28-08-2025,45.18,44.50,46.24,43.75,11.71M,1.01%
26-08-2025,44.73,44.13,47.46,44.13,19.50M,-3.72%
25-08-2025,46.46,46.61,47.45,46.46,6.08M,-5.01%
22-08-2025,48.91,50.85,50.85,48.10,13.41M,-2.36%
21-08-2025,50.09,49.90,50.09,48.66,16.83M,4.99%
20-08-2025,47.71,46.77,47.71,46.35,9.16M,5.00%
19-08-2025,45.44,43.50,45.44,43.50,11.44M,4.99%
18-08-2025,43.28,44.50,44.92,43.00,10.73M,-0.05%
14-08-2025,43.30,42.00,44.00,41.88,8.08M,2.39%
13-08-2025,42.29,44.10,44.10,41.76,16.46M,-3.80%
12-08-2025,43.96,44.10,44.65,43.37,7.24M,0.32%
11-08-2025,43.82,43.03,44.68,42.50,11.53M,1.84%
08-08-2025,43.03,44.15,45.70,42.86,17.57M,-4.63%
07-08-2025,45.12,45.80,46.50,45.08,24.25M,-4.93%
06-08-2025,47.46,43.55,47.46,42.94,62.42M,5.00%
05-08-2025,45.20,45.20,45.20,45.20,4.79M,-5.00%
04-08-2025,47.58,47.58,47.58,47.58,4.33M,-5.01%
01-08-2025,50.09,50.43,51.89,50.09,18.17M,-5.01%
31-07-2025,52.73,52.20,54.29,51.25,9.08M,-1.18%
30-07-2025,53.36,56.30,56.49,53.36,13.11M,-5.00%
29-07-2025,56.17,52.16,56.50,51.80,25.47M,4.13%
28-07-2025,53.94,55.00,56.74,53.94,39.58M,-5.00%
25-07-2025,56.78,56.78,58.27,56.78,9.82M,-5.00%
24-07-2025,59.77,62.77,62.77,59.77,13.85M,-5.01%
23-07-2025,62.92,60.80,63.70,59.00,17.45M,2.54%
22-07-2025,61.36,63.25,63.25,61.29,13.27M,-3.40%
21-07-2025,63.52,64.02,64.70,63.25,7.14M,-0.78%
18-07-2025,64.02,64.80,65.00,63.00,10.00M,-1.67%
17-07-2025,65.11,66.38,66.60,65.00,8.46M,-1.42%
16-07-2025,66.05,64.50,66.85,64.31,12.92M,2.36%
15-07-2025,64.53,65.50,65.90,64.26,6.98M,-1.16%
14-07-2025,65.29,65.25,66.10,64.25,9.21M,0.74%
11-07-2025,64.81,64.70,66.15,64.40,9.79M,0.61%
10-07-2025,64.42,64.35,65.25,63.85,7.68M,0.17%
09-07-2025,64.31,65.10,65.50,64.00,9.23M,-1.24%
08-07-2025,65.12,65.10,66.20,64.75,9.32M,-0.23%
07-07-2025,65.27,66.10,66.70,65.01,10.02M,-1.23%
04-07-2025,66.08,64.55,67.00,63.60,13.60M,0.82%
03-07-2025,65.54,66.40,67.00,64.70,22.63M,-3.69%
02-07-2025,68.05,69.50,69.63,67.35,15.01M,-2.27%
01-07-2025,69.63,70.19,70.90,68.01,15.83M,-0.94%
30-06-2025,70.29,70.34,70.90,69.18,23.48M,1.60%
27-06-2025,69.18,66.48,69.50,65.55,31.10M,3.87%
26-06-2025,66.60,66.80,68.25,65.65,24.84M,-0.22%
25-06-2025,66.75,64.17,66.75,63.60,27.91M,4.99%
24-06-2025,63.58,64.00,64.55,63.10,17.54M,1.57%
23-06-2025,62.60,62.12,63.44,61.40,16.94M,-1.49%
20-06-2025,63.55,62.60,65.00,61.01,24.27M,0.05%
19-06-2025,63.52,65.80,66.90,63.46,26.27M,-4.91%
18-06-2025,66.80,62.02,66.81,60.44,43.55M,4.98%
17-06-2025,63.63,66.00,66.10,63.63,22.30M,-5.00%
16-06-2025,66.98,67.50,69.00,64.67,151.52M,-0.10%
13-06-2025,67.05,67.00,69.18,66.60,153.75M,-3.83%
12-06-2025,69.72,71.00,72.20,68.05,219.77M,-2.17%
11-06-2025,71.27,73.18,76.49,70.39,460.35M,0.04%
10-06-2025,71.24,65.69,72.23,65.35,496.22M,10.24%
09-06-2025,64.62,62.28,64.95,62.20,188.00M,4.83%
06-06-2025,61.64,61.39,63.25,61.00,136.47M,1.23%
05-06-2025,60.89,60.10,63.43,59.90,169.28M,-0.07%
04-06-2025,60.93,59.00,62.10,58.54,244.78M,3.46%
03-06-2025,58.89,61.98,62.42,58.51,168.54M,-4.97%
02-06-2025,61.97,58.64,62.80,58.55,464.24M,6.66%
30-05-2025,58.10,52.48,60.50,52.17,533.95M,11.26%
29-05-2025,52.22,51.25,53.10,50.76,149.48M,3.55%
28-05-2025,50.43,52.50,52.72,50.21,95.40M,-3.09%
27-05-2025,52.04,50.93,52.39,49.73,159.94M,2.68%
26-05-2025,50.68,52.90,55.10,50.10,237.11M,-2.35%
23-05-2025,51.90,45.00,53.10,44.40,429.24M,16.39%
22-05-2025,44.59,45.00,45.70,43.85,42.54M,-0.80%
21-05-2025,44.95,44.97,45.40,44.43,37.31M,0.49%
20-05-2025,44.73,46.05,46.81,44.52,59.56M,-2.10%
19-05-2025,45.69,45.45,46.73,45.25,52.98M,1.38%
16-05-2025,45.07,44.40,45.37,43.86,66.26M,1.74%
15-05-2025,44.30,44.50,45.10,44.00,42.28M,-0.02%
14-05-2025,44.31,43.71,44.60,43.51,51.94M,1.84%
13-05-2025,43.51,43.00,44.20,42.56,72.44M,1.73%
12-05-2025,42.77,42.40,43.92,41.26,164.81M,10.66%
09-05-2025,38.65,37.35,38.89,37.00,46.57M,1.02%
08-05-2025,38.26,39.70,40.10,37.85,35.50M,-2.17%
07-05-2025,39.11,37.50,39.66,37.41,42.65M,2.25%
06-05-2025,38.25,40.89,41.14,38.12,43.93M,-6.11%
05-05-2025,40.74,40.79,41.20,39.89,34.45M,1.52%
02-05-2025,40.13,40.75,41.55,40.06,46.50M,0.35%
30-04-2025,39.99,41.21,41.64,39.60,38.77M,-2.49%
29-04-2025,41.01,41.80,42.62,40.82,42.95M,-0.85%
28-04-2025,41.36,41.36,42.04,40.72,37.01M,0.00%
25-04-2025,41.36,44.56,44.90,40.91,76.76M,-6.78%
24-04-2025,44.37,43.50,46.85,43.19,108.97M,1.93%
23-04-2025,43.53,43.82,44.13,42.36,36.76M,-0.09%
22-04-2025,43.57,44.35,44.89,43.32,38.25M,-1.47%
21-04-2025,44.22,42.35,44.67,42.05,65.65M,4.96%
17-04-2025,42.13,41.95,42.97,41.66,34.31M,0.72%
16-04-2025,41.83,41.85,42.58,41.53,28.57M,0.48%
15-04-2025,41.63,40.25,42.62,40.15,37.74M,4.00%
11-04-2025,40.03,40.50,40.65,39.20,27.79M,2.64%
09-04-2025,39.00,39.80,40.45,38.61,25.02M,-2.08%
08-04-2025,39.83,40.80,41.07,39.35,24.44M,2.08%
07-04-2025,39.02,35.64,39.44,35.11,47.79M,-5.63%
04-04-2025,41.35,43.10,43.40,41.06,35.28M,-4.19%
03-04-2025,43.16,41.96,44.48,41.91,57.38M,2.01%
02-04-2025,42.31,41.93,42.76,41.05,31.20M,0.76%
01-04-2025,41.99,41.95,43.34,41.61,34.63M,-2.30%
28-03-2025,42.98,43.17,44.76,42.40,84.94M,0.02%
27-03-2025,42.97,39.39,43.60,38.72,84.10M,8.87%
26-03-2025,39.47,37.12,41.40,36.89,101.79M,5.96%
25-03-2025,37.25,38.58,38.60,36.73,23.12M,-2.51%
24-03-2025,38.21,38.20,38.86,37.80,24.37M,1.03%
21-03-2025,37.82,36.46,38.10,36.45,29.35M,3.76%
20-03-2025,36.45,38.11,38.29,36.30,25.55M,-3.37%
19-03-2025,37.72,35.11,38.35,35.11,43.89M,8.39%
18-03-2025,34.80,33.45,34.99,33.45,23.35M,5.39%
17-03-2025,33.02,33.75,33.95,32.90,16.76M,-1.11%
13-03-2025,33.39,34.18,34.65,33.32,16.25M,-0.74%
12-03-2025,33.64,34.30,34.89,33.30,15.48M,-1.06%
11-03-2025,34.00,34.09,34.34,33.35,17.07M,-1.22%
10-03-2025,34.42,36.25,36.75,34.05,19.88M,-4.50%
07-03-2025,36.04,35.30,36.37,34.94,29.89M,2.42%
06-03-2025,35.19,35.15,36.14,34.44,36.41M,1.53%
05-03-2025,34.66,33.20,34.82,33.20,22.57M,4.78%
04-03-2025,33.08,32.10,33.90,32.05,25.68M,0.49%
03-03-2025,32.92,33.46,34.48,31.27,32.48M,-1.02%
28-02-2025,33.26,34.33,34.76,33.00,27.89M,-4.29%
27-02-2025,34.75,36.70,36.89,34.40,20.81M,-4.85%
25-02-2025,36.52,37.00,37.55,36.21,10.97M,-0.76%
24-02-2025,36.80,37.40,37.55,36.70,11.57M,-2.39%
21-02-2025,37.70,37.99,39.15,37.52,15.68M,-1.21%
20-02-2025,38.16,37.90,38.65,37.50,13.74M,0.55%
19-02-2025,37.95,36.28,38.40,36.05,19.02M,3.18%`;

const weekCSV = `Date,Price,Open,High,Low,Vol.,Change %
15-02-2026,26.25,26.80,27.90,26.00,122.87M,-6.18%
08-02-2026,26.80,28.50,29.45,26.70,148.06M,-4.22%
01-02-2026,27.98,28.30,31.90,25.92,466.47M,-0.96%
25-01-2026,28.25,28.00,29.96,26.83,219.81M,-0.07%
18-01-2026,28.27,31.98,32.14,28.00,225.46M,-11.32%
11-01-2026,31.88,33.88,34.22,31.57,133.26M,-5.90%
04-01-2026,33.88,35.93,36.41,33.70,106.53M,-5.71%
28-12-2025,35.93,36.55,36.95,33.35,253.49M,-1.67%
21-12-2025,36.54,38.30,38.70,34.59,298.52M,-5.24%
14-12-2025,38.56,34.31,39.39,34.03,413.14M,11.67%
07-12-2025,34.53,37.00,37.20,32.40,229.77M,-8.36%
30-11-2025,37.68,39.86,40.13,37.40,98.65M,-5.68%
23-11-2025,39.95,39.14,40.80,36.70,257.03M,2.86%
16-11-2025,38.84,41.74,42.38,38.75,165.93M,-6.02%
09-11-2025,41.33,39.20,42.87,38.00,281.38M,5.46%
02-11-2025,39.19,46.00,46.58,38.50,326.11M,-15.58%
26-10-2025,46.42,45.15,47.75,43.27,196.33M,2.70%
19-10-2025,45.20,45.00,46.58,44.04,63.38M,1.25%
12-10-2025,44.64,43.55,47.51,43.55,166.33M,-8.11%
05-10-2025,48.58,46.20,50.73,43.75,173.00M,4.52%
28-09-2025,46.48,45.02,47.40,44.11,60.04M,3.84%
21-09-2025,44.76,47.89,49.37,44.50,60.71M,-6.83%
14-09-2025,48.04,45.66,49.28,45.52,120.33M,4.91%
07-09-2025,45.79,47.10,47.58,44.60,63.38M,-2.41%
31-08-2025,46.92,44.50,48.48,43.55,49.71M,6.83%
24-08-2025,43.92,46.61,47.46,43.55,44.13M,-10.20%
17-08-2025,48.91,44.50,50.85,43.00,61.58M,12.96%
10-08-2025,43.30,43.03,44.68,41.76,43.29M,0.63%
03-08-2025,43.03,47.58,47.58,42.86,113.36M,-14.09%
27-07-2025,50.09,55.00,56.74,50.09,105.41M,-11.78%
20-07-2025,56.78,64.02,64.70,56.78,61.53M,-11.31%
13-07-2025,64.02,65.25,66.85,63.00,47.58M,-1.22%
06-07-2025,64.81,66.10,66.70,63.85,46.05M,-1.92%
29-06-2025,66.08,70.34,70.90,63.60,90.55M,-4.48%
22-06-2025,69.18,62.12,69.50,61.40,118.33M,8.86%
15-06-2025,63.55,67.50,69.00,60.44,267.90M,-5.22%
08-06-2025,67.05,62.28,76.49,62.20,1.52B,8.78%
01-06-2025,61.64,58.64,63.43,58.51,1.18B,6.09%
25-05-2025,58.10,52.90,60.50,49.73,1.18B,11.95%
18-05-2025,51.90,45.45,53.10,43.85,621.63M,15.15%
11-05-2025,45.07,42.40,45.37,41.26,397.73M,16.61%
04-05-2025,38.65,40.79,41.20,37.00,203.10M,-3.69%
27-04-2025,40.13,41.36,42.62,39.60,165.23M,-2.97%
20-04-2025,41.36,42.35,46.85,40.91,326.39M,-1.83%
13-04-2025,42.13,40.25,42.97,40.15,100.63M,5.25%
06-04-2025,40.03,35.64,41.07,35.11,125.04M,-3.19%
30-03-2025,41.35,41.95,44.48,41.05,158.49M,-3.79%
23-03-2025,42.98,38.20,44.76,36.73,318.32M,13.64%
16-03-2025,37.82,33.75,38.35,32.90,138.90M,13.27%
09-03-2025,33.39,36.25,36.75,33.30,68.68M,-7.35%
02-03-2025,36.04,33.46,36.37,31.27,147.04M,8.36%
23-02-2025,33.26,37.40,37.55,33.00,71.24M,-11.78%
16-02-2025,37.70,37.19,39.15,35.91,86.60M,1.15%
09-02-2025,37.27,42.40,42.59,36.67,123.06M,-10.92%
02-02-2025,41.84,40.23,43.94,37.62,169.68M,4.37%
26-01-2025,40.09,38.49,40.40,35.19,76.31M,4.08%
19-01-2025,38.52,42.39,42.70,38.31,67.71M,-8.42%
12-01-2025,42.06,38.39,42.95,36.49,101.12M,7.90%
05-01-2025,38.98,45.80,46.10,38.80,132.54M,-14.89%
29-12-2024,45.80,43.00,47.25,41.26,126.75M,6.12%
22-12-2024,43.16,44.98,45.62,42.95,32.18M,-3.55%
15-12-2024,44.75,47.70,48.50,43.01,70.79M,-5.69%
08-12-2024,47.45,45.39,48.00,42.50,91.61M,6.65%
01-12-2024,44.49,38.70,45.25,37.35,73.96M,14.96%
24-11-2024,38.70,35.93,40.02,34.25,72.16M,10.41%
17-11-2024,35.05,35.93,36.00,33.30,55.22M,-2.45%
10-11-2024,35.93,39.50,40.73,35.15,84.10M,-13.59%
03-11-2024,41.58,42.50,45.76,40.87,102.57M,-3.37%
27-10-2024,43.03,43.20,43.98,40.00,49.96M,-0.39%
20-10-2024,43.20,42.60,44.35,37.30,90.94M,1.77%
13-10-2024,42.45,43.14,45.80,39.65,96.39M,-4.02%
06-10-2024,44.23,48.40,49.70,44.23,133.57M,-13.19%
29-09-2024,50.95,46.25,53.64,44.21,518.82M,9.92%
22-09-2024,46.35,38.15,46.35,38.15,430.27M,27.55%
15-09-2024,36.34,30.30,36.34,29.92,279.62M,21.82%
08-09-2024,29.83,30.15,30.69,29.21,114.76M,-1.29%
01-09-2024,30.22,30.60,32.25,29.26,176.04M,-1.11%
25-08-2024,30.56,32.75,32.75,30.00,325.40M,-11.37%
18-08-2024,34.48,31.90,38.11,31.60,657.33M,10.41%
11-08-2024,31.23,32.00,32.68,29.26,160.57M,-3.37%
04-08-2024,32.32,33.50,34.28,29.77,408.00M,-6.43%
28-07-2024,34.54,30.34,34.54,30.03,454.79M,16.02%
21-07-2024,29.77,27.12,30.58,25.75,152.01M,9.77%
14-07-2024,27.12,27.40,29.53,26.85,80.02M,-0.73%
07-07-2024,27.32,29.22,29.30,26.90,81.30M,-5.89%
30-06-2024,29.03,29.38,29.38,28.02,93.75M,0.35%
23-06-2024,28.93,29.80,30.41,28.52,120.05M,-3.15%
16-06-2024,29.87,32.05,32.30,29.75,164.96M,-4.63%
09-06-2024,31.32,25.35,33.11,25.25,603.98M,25.28%
02-06-2024,25.00,25.75,25.75,23.30,141.87M,1.83%
26-05-2024,24.55,26.05,26.20,24.40,102.40M,-7.71%
19-05-2024,26.60,26.15,27.40,25.90,87.20M,1.72%
12-05-2024,26.15,25.15,26.60,23.90,70.23M,4.81%
05-05-2024,24.95,26.60,26.75,24.35,80.09M,-6.90%
28-04-2024,26.80,28.00,28.30,26.65,59.27M,-3.25%
21-04-2024,27.70,28.50,28.80,27.40,77.76M,-1.25%
14-04-2024,28.05,26.50,28.70,25.50,83.75M,2.56%
07-04-2024,27.35,32.75,32.75,26.95,148.31M,-16.10%
31-03-2024,32.60,28.85,34.45,28.40,154.92M,15.40%
24-03-2024,28.25,27.60,28.50,26.60,91.95M,7.41%
17-03-2024,26.30,23.20,26.30,22.45,59.63M,19.00%
10-03-2024,22.10,23.00,23.40,19.40,67.36M,-2.00%
03-03-2024,22.55,24.05,24.20,21.90,43.27M,-5.85%
25-02-2024,23.95,25.70,25.95,22.30,52.50M,-6.45%
18-02-2024,25.60,26.30,27.30,25.00,42.94M,-2.29%
11-02-2024,26.20,27.80,27.80,24.85,58.01M,-4.73%
04-02-2024,27.50,27.40,29.00,25.35,110.48M,-4.51%
28-01-2024,28.80,30.35,31.25,28.55,151.63M,-4.64%
21-01-2024,30.20,29.70,31.05,28.05,256.57M,2.20%
14-01-2024,29.55,31.05,31.55,27.95,315.33M,-4.37%
07-01-2024,30.90,31.65,33.15,30.00,457.20M,-1.59%
31-12-2023,31.40,23.50,33.00,23.30,2.25B,34.76%
24-12-2023,23.30,22.60,23.40,22.15,320.05M,4.02%
17-12-2023,22.40,23.35,24.65,20.60,605.68M,-5.08%
10-12-2023,23.60,24.35,25.20,22.85,791.27M,-1.46%
03-12-2023,23.95,21.10,24.45,20.65,1.00B,14.87%
26-11-2023,20.85,21.00,21.65,20.65,402.31M,-0.24%
19-11-2023,20.90,23.00,23.20,20.70,557.23M,-8.53%
12-11-2023,22.85,20.70,23.75,20.25,934.80M,11.46%
05-11-2023,20.50,18.40,21.75,18.35,1.00B,12.33%
29-10-2023,18.25,16.90,18.65,16.45,325.58M,8.63%`;

const monthCSV = `Date,Price,Open,High,Low,Vol.,Change %
13-02-2026,26.80,27.41,27.42,26.70,24.37M,-2.93%
31-01-2026,27.26,28.30,28.30,27.11,19.78M,-3.50%
31-12-2025,34.85,34.00,35.20,33.93,46.88M,3.54%
30-11-2025,39.95,40.00,40.49,39.21,39.22M,-0.65%
31-10-2025,46.42,46.30,47.60,45.60,33.05M,-0.28%
30-09-2025,44.36,45.39,45.78,44.11,9.96M,-1.18%
31-08-2025,43.92,45.20,45.50,43.55,6.84M,-2.79%
31-07-2025,52.73,52.20,54.29,51.25,9.08M,-1.18%
30-06-2025,70.29,70.34,70.90,69.18,23.48M,1.60%
31-05-2025,58.10,52.48,60.50,52.17,533.95M,11.26%
30-04-2025,39.99,41.21,41.64,39.60,38.77M,-2.49%
28-03-2025,42.98,43.17,44.76,42.40,84.94M,0.02%
28-02-2025,33.26,34.33,34.76,33.00,27.89M,-4.29%
31-01-2025,40.09,38.83,40.40,38.57,12.69M,3.67%
31-12-2024,42.60,41.65,42.79,41.40,16.85M,1.79%
30-11-2024,38.70,40.00,40.00,38.30,12.36M,-3.25%
31-10-2024,42.73,42.15,43.20,41.40,7.64M,1.91%
30-09-2024,48.66,46.25,48.66,44.21,209.33M,4.98%
31-08-2024,30.56,30.71,31.27,30.33,39.43M,-0.03%
31-07-2024,32.84,31.59,32.84,31.36,79.35M,4.99%
28-06-2024,28.93,29.05,30.26,28.77,36.54M,0.38%
31-05-2024,24.55,24.85,25.05,24.40,13.94M,-0.61%
30-04-2024,27.30,27.65,28.30,27.10,16.66M,-0.91%
28-03-2024,28.25,28.20,28.50,28.00,18.39M,2.17%
29-02-2024,24.20,22.50,24.45,22.30,16.89M,3.20%
31-01-2024,29.80,30.05,30.20,29.00,21.10M,-0.50%
29-12-2023,23.30,22.40,23.40,22.20,139.42M,4.25%
30-11-2023,21.15,21.55,21.60,20.80,105.29M,-1.63%
31-10-2023,17.10,17.05,17.30,16.80,42.27M,0.88%
31-10-2023,19.25,19.35,19.40,19.05,39.54M,0.52%
30-09-2023,19.25,19.30,19.55,19.15,52.66M,0.00%
31-08-2023,19.15,20.40,20.65,18.90,264.12M,-5.20%
31-07-2023,16.45,16.10,16.60,15.95,107.62M,2.17%
30-06-2023,14.05,14.30,14.45,13.80,64.80M,-0.71%
31-05-2023,12.95,13.00,13.15,12.75,72.17M,0.00%
30-04-2023,12.20,12.60,12.70,12.10,36.72M,-2.40%
31-03-2023,9.95,9.95,10.40,9.90,30.78M,1.53%
28-02-2023,9.80,10.00,10.05,9.75,15.58M,-1.01%
31-01-2023,12.75,12.55,13.10,12.40,23.85M,2.00%
30-12-2022,14.35,14.45,14.75,14.30,9.99M,0.35%
30-11-2022,16.05,15.90,16.40,15.80,16.78M,0.94%
31-10-2022,16.85,17.10,17.40,16.50,13.51M,0.30%
31-10-2022,16.00,15.85,16.15,15.85,3.72M,-0.62%`;

const newDayCSV = `Date,Price,Open,High,Low,Vol.,Change %
20-02-2026,26.25,26.50,26.68,26.00,17.44M,-1.83%
19-02-2026,26.74,27.30,27.43,26.65,21.69M,-2.52%
18-02-2026,27.43,27.33,27.90,27.23,24.49M,0.37%
17-02-2026,27.33,26.80,27.50,26.70,36.85M,2.51%
16-02-2026,26.66,26.80,26.85,26.33,22.53M,-0.52%`;

const newMonthCSV = `Date,Price,Open,High,Low,Vol.,Change %
20-02-2026,26.25,26.50,26.68,26.00,17.44M,-1.83%
31-01-2026,26.25,28.30,31.90,25.92,737.53M,-7.08%
31-12-2025,28.25,35.36,36.41,26.83,751.66M,-18.94%
30-11-2025,34.85,39.86,40.13,32.40,1.23B,-12.77%
31-10-2025,39.95,46.00,46.58,36.70,1.03B,-13.94%
30-09-2025,46.42,44.30,50.73,43.27,633.74M,4.64%
31-08-2025,44.36,44.50,49.37,43.55,319.47M,1.00%
31-07-2025,43.92,50.43,51.89,41.76,280.53M,-16.71%
30-06-2025,52.73,70.19,70.90,51.25,309.48M,-24.98%
31-05-2025,70.29,58.64,76.49,58.51,3.11B,20.98%
30-04-2025,58.10,40.75,60.50,37.00,2.44B,45.29%
31-03-2025,39.99,41.95,46.85,35.11,829.28M,-6.96%
28-02-2025,42.98,33.46,44.76,31.27,672.94M,29.22%
31-01-2025,33.26,40.23,43.94,33.00,450.58M,-17.04%
31-12-2024,40.09,42.89,47.25,35.19,474.84M,-5.89%
30-11-2024,42.60,38.70,48.50,37.35,298.14M,10.08%
31-10-2024,38.70,43.40,45.76,33.30,320.28M,-9.43%
30-09-2024,48.66,30.60,48.66,29.21,1.21B,59.23%
31-08-2024,30.56,33.39,38.11,29.26,1.80B,-6.94%
31-07-2024,32.84,29.38,32.84,25.75,612.58M,13.52%
30-06-2024,28.93,25.75,33.11,23.30,1.03B,17.84%
31-05-2024,24.55,27.35,27.45,23.90,368.57M,-10.07%
31-03-2024,27.30,28.85,34.45,25.50,495.36M,-3.36%
29-02-2024,28.25,24.45,28.50,19.40,269.63M,16.74%`;

/* -----------------------------------------------------------------------------
   3. DATA PARSING FUNCTIONS
   ----------------------------------------------------------------------------- */

/**
 * parseVolume - Converts volume string to numeric value
 * 
 * Handles different volume formats:
 * - B: Billions (e.g., "1.5B" = 1,500,000,000)
 * - M: Millions (e.g., "24.37M" = 24,370,000)
 * - K: Thousands (e.g., "10.5K" = 10,500)
 * - Plain numbers
 * 
 * @param {string} vol - Volume string from CSV
 * @returns {number} - Numeric volume value
 */
function parseVolume(vol) {
    // Handle null/undefined input
    if (!vol) return 0;
    
    // Remove any commas from the string
    vol = vol.toString().replace(/,/g, '');
    
    // Check for billions (B)
    if (vol.includes('B')) return parseFloat(vol) * 1000000000;
    
    // Check for millions (M)
    if (vol.includes('M')) return parseFloat(vol) * 1000000;
    
    // Check for thousands (K)
    if (vol.includes('K')) return parseFloat(vol) * 1000;
    
    // Plain number or zero
    return parseFloat(vol) || 0;
}

/**
 * parseCSV - Parses CSV string into array of data objects
 * 
 * @param {string} csvText - CSV data string
 * @returns {Array} - Array of parsed data objects sorted by date
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const data = [];
    
    function parseLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim().replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim().replace(/^"|"$/g, ''));
        return result;
    }
    
    for (let i = 1; i < lines.length; i++) {
        const parts = parseLine(lines[i]);
        if (parts.length < 7) continue;
        
        const dateStr = parts[0].trim();
        const price = parseFloat(parts[1]);
        const open = parseFloat(parts[2]);
        const high = parseFloat(parts[3]);
        const low = parseFloat(parts[4]);
        const vol = parseVolume(parts[5]);
        const change = parseFloat(parts[6].replace('%', ''));
        
        const dateParts = dateStr.split('-');
        const time = Date.UTC(
            parseInt(dateParts[2]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[0])
        );
        
        if (isNaN(price) || isNaN(time)) continue;
        
        data.push({ time, date: dateStr, price, open, high, low, vol, change });
    }
    
    return data.sort((a, b) => a.time - b.time);
}

/* -----------------------------------------------------------------------------
   2. GLOBAL VARIABLES & STATE
   ----------------------------------------------------------------------------- */

let datasets = { day: [], week: [], month: [] };
let currentData = [];
let currentRange = 'day';
let candleChart, lineChart, volumeChart, rsiChart, macdChart;
let activeIndicators = { sma: true, bb: false, rsi: false, macd: false, volume: true };
let currentTheme = 'dark';

/* -----------------------------------------------------------------------------
   THEME TOGGLE
   ----------------------------------------------------------------------------- */

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const checkbox = document.querySelector('.switch__input');
    if (checkbox) {
        checkbox.checked = currentTheme === 'light';
    }
    
    updateCharts();
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const checkbox = document.querySelector('.switch__input');
    if (checkbox) {
        checkbox.checked = savedTheme === 'light';
    }
}

/* -----------------------------------------------------------------------------
   3. DATA PARSING FUNCTIONS
   ----------------------------------------------------------------------------- */

/**
 * mergeAndDeduplicateData - Merges two datasets and removes duplicates based on time
 * 
 * @param {Array} existingData - The existing dataset
 * @param {Array} newData - The new data to merge
 * @returns {Array} - Merged and sorted dataset without duplicates
 */
function mergeAndDeduplicateData(existingData, newData) {
    const timeMap = new Map();
    
    // Add existing data to map
    existingData.forEach(d => timeMap.set(d.time, d));
    
    // Add new data, overwriting only if newer (higher time = more recent)
    newData.forEach(d => {
        if (!timeMap.has(d.time) || d.time > timeMap.get(d.time).time) {
            timeMap.set(d.time, d);
        }
    });
    
    // Convert back to array and sort by time
    return Array.from(timeMap.values()).sort((a, b) => a.time - b.time);
}

/**
 * loadAllData - Main initialization function
 * 
 * Parses all CSV data, calculates statistics, and renders initial view.
 * Called once when page loads.
 */
function loadAllData() {
    try {
        initTheme();
        
        // Parse embedded CSV data
        let parsedDay = parseCSV(dayCSV);
        let parsedWeek = parseCSV(weekCSV);
        let parsedMonth = parseCSV(monthCSV);
        
        // Parse new data from additional CSV constants
        const newDayData = parseCSV(newDayCSV);
        const newMonthData = parseCSV(newMonthCSV);
        
        // Merge new data with existing, removing duplicates
        parsedDay = mergeAndDeduplicateData(parsedDay, newDayData);
        parsedMonth = mergeAndDeduplicateData(parsedMonth, newMonthData);
        
        // Store merged datasets
        datasets.day = parsedDay;
        datasets.week = parsedWeek;
        datasets.month = parsedMonth;
        
        // Calculate and render statistics table
        calculateStatsAnalysis();
        
        // Initialize calculations panel
        initCalculationsPanel();
        
        // Initialize with daily data
        switchTimeRange('day');
        
        // Hide loading overlay
        document.getElementById('loadingOverlay').classList.add('hidden');
    } catch (error) {
        // Display error message if parsing fails
        console.error('Error:', error);
        document.getElementById('loadingOverlay').innerHTML = 
            '<p style="color: var(--accent-red);">Error: ' + error.message + '</p>';
    }
}


/* -----------------------------------------------------------------------------
   5. TIME RANGE SWITCHING
   ----------------------------------------------------------------------------- */

/**
 * switchTimeRange - Handles time range button clicks
 * 
 * Updates currentData to show data for selected time range,
 * updates button states, and refreshes stats and charts.
 * 
 * @param {string} range - Time range ('day', 'week', or 'month')
 */
function switchTimeRange(range) {
    // Update current range state
    currentRange = range;
    currentData = datasets[range];
    
    // Update button active states - remove active from all time range buttons
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        // Only affect buttons that are time range buttons (not chart type)
        if (btn.id.startsWith('btnDay') || btn.id.startsWith('btnWeek') || btn.id.startsWith('btnMonth')) {
            btn.classList.remove('active');
        }
    });
    
    // Add active class to selected button (e.g., 'btnDay')
    // charAt(0).toUpperCase() + slice(1) capitalizes first letter
    document.getElementById('btn' + range.charAt(0).toUpperCase() + range.slice(1)).classList.add('active');
    
    // Update displayed statistics
    updateStats();
    
    // Re-render charts with new data
    updateCharts();
}


/* -----------------------------------------------------------------------------
   6. CHART TYPE SWITCHING
   ----------------------------------------------------------------------------- */

/**
 * switchChart - Toggles between candlestick and line chart views
 * 
 * @param {string} type - Chart type ('candle' or 'line')
 */
function switchChart(type) {
    // Get chart container elements
    const candleEl = document.getElementById('candleChart');
    const lineEl = document.getElementById('lineChart');
    
    // Remove active state from both chart type buttons
    document.getElementById('btnCandle').classList.remove('active');
    document.getElementById('btnLine').classList.remove('active');
    
    if (type === 'candle') {
        // Show candlestick chart, hide line chart
        candleEl.classList.remove('hidden');
        lineEl.classList.add('hidden');
        document.getElementById('btnCandle').classList.add('active');
        
        // Fit content to view
        if (candleChart) candleChart.timeScale().fitContent();
    } else {
        // Show line chart, hide candlestick chart
        candleEl.classList.add('hidden');
        lineEl.classList.remove('hidden');
        document.getElementById('btnLine').classList.add('active');
        
        // Resize and fit line chart
        if (lineChart) {
            lineChart.resize(lineEl.clientWidth, 500);
            lineChart.timeScale().fitContent();
        }
    }
}


/* -----------------------------------------------------------------------------
   7. INDICATOR TOGGLING
   ----------------------------------------------------------------------------- */

/**
 * toggleIndicator - Enables/disables technical indicators
 * 
 * Toggles indicator state and shows/hides corresponding panels.
 * Indicators: SMA, Bollinger Bands, RSI, MACD, Volume
 * 
 * @param {string} indicator - Indicator name ('sma', 'bb', 'rsi', 'macd', 'volume')
 */
function toggleIndicator(indicator) {
    // Toggle the indicator's active state
    activeIndicators[indicator] = !activeIndicators[indicator];
    
    // Update button appearance
    const btn = document.getElementById('btn' + indicator.toUpperCase());
    if (activeIndicators[indicator]) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
    
    // Show/hide panel for indicators that have separate charts (RSI, MACD, Volume)
    if (['rsi', 'macd', 'volume'].includes(indicator)) {
        const chartEl = document.getElementById(indicator + 'Chart');
        if (chartEl) {
            // Toggle 'active' class to show/hide
            chartEl.classList.toggle('active', activeIndicators[indicator]);
        }
    }
    
    // Re-render charts with updated indicators
    updateCharts();
}


/* -----------------------------------------------------------------------------
   8. STATISTICS UPDATE
   ----------------------------------------------------------------------------- */

/**
 * updateStats - Updates all displayed statistics and metrics
 * 
 * Updates:
 * - Current price
 * - Price change (with color coding)
 * - Period high/low
 * - Average volume
 * - Performance metrics (best/worst periods)
 * - Technical indicator values
 */
function updateStats() {
    // Guard clause - no data to display
    if (currentData.length === 0) return;
    
    // Get latest (most recent) and first (oldest) data points
    const latest = currentData[currentData.length - 1];
    const first = currentData[0];
    
    // Get DOM elements for stat cards
    const currentPriceEl = document.getElementById('currentPrice');
    const changeEl = document.getElementById('priceChange');
    const periodHighEl = document.getElementById('periodHigh');
    const periodLowEl = document.getElementById('periodLow');
    const avgVolumeEl = document.getElementById('avgVolume');
    const totalPeriodsEl = document.getElementById('totalPeriods');
    
    // Update current price display (formatted with Rupee symbol)
    if (currentPriceEl) currentPriceEl.textContent = '₹' + latest.price.toFixed(2);
    
    // Update price change with sign and color
    if (changeEl) {
        changeEl.textContent = (latest.change >= 0 ? '+' : '') + latest.change.toFixed(2) + '%';
        changeEl.className = 'stat-value ' + (latest.change >= 0 ? 'positive' : 'negative');
    }
    
    // Calculate period high and low from all prices
    const prices = currentData.map(d => d.price);
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    
    if (periodHighEl) periodHighEl.textContent = '₹' + high.toFixed(2);
    if (periodLowEl) periodLowEl.textContent = '₹' + low.toFixed(2);
    
    // Calculate average volume
    const volumes = currentData.map(d => d.vol);
    const avgVol = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    if (avgVolumeEl) avgVolumeEl.textContent = (avgVol / 1000000).toFixed(2) + 'M';
    
    // Update total periods count
    if (totalPeriodsEl) totalPeriodsEl.textContent = currentData.length;
    
    // Get performance metric elements
    const bestPeriodEl = document.getElementById('bestPeriod');
    const worstPeriodEl = document.getElementById('worstPeriod');
    const positivePeriodsEl = document.getElementById('positivePeriods');
    const negativePeriodsEl = document.getElementById('negativePeriods');
    
    // Find best (highest change) and worst (lowest change) periods
    let bestPeriod = currentData[0];
    let worstPeriod = currentData[0];
    currentData.forEach(d => {
        if (d.change > bestPeriod.change) bestPeriod = d;
        if (d.change < worstPeriod.change) worstPeriod = d;
    });
    
    // Display best/worst periods with date
    if (bestPeriodEl) bestPeriodEl.textContent = '+' + bestPeriod.change.toFixed(2) + '% (' + bestPeriod.date + ')';
    if (worstPeriodEl) worstPeriodEl.textContent = worstPeriod.change.toFixed(2) + '% (' + worstPeriod.date + ')';
    
    // Count positive and negative periods
    const posPeriods = currentData.filter(d => d.change > 0).length;
    const negPeriods = currentData.filter(d => d.change < 0).length;
    
    // Display counts with percentages
    if (positivePeriodsEl) positivePeriodsEl.textContent = posPeriods + ' (' + (posPeriods / currentData.length * 100).toFixed(1) + '%)';
    if (negativePeriodsEl) negativePeriodsEl.textContent = negPeriods + ' (' + (negPeriods / currentData.length * 100).toFixed(1) + '%)';
    
    // Update indicator values panel
    updateIndicatorValues();
}

/**
 * updateIndicatorValues - Updates the technical indicators panel
 * 
 * Calculates and displays current values for:
 * - SMA 50
 * - SMA 200
 * - RSI
 * - MACD
 * - Signal Line
 */
function updateIndicatorValues() {
    if (currentData.length === 0) return;
    
    // Get indicator value elements
    const sma50El = document.getElementById('sma50Value');
    const sma200El = document.getElementById('sma200Value');
    const rsiEl = document.getElementById('rsiValue');
    const macdEl = document.getElementById('macdValue');
    const signalEl = document.getElementById('signalValue');
    
    // Get SMA start date based on current range
    const smaStartDates = {
        day: new Date('2025-04-01'),
        week: new Date('2023-10-29'),
        month: new Date('2022-10-31')
    };
    const smaStartDate = smaStartDates[currentRange] || null;
    
    // Calculate and display SMA 50 if enough data exists
    if (currentData.length >= 50) {
        const sma50 = calculateSMA(currentData, 50, smaStartDate);
        const lastSMA50 = sma50.filter(d => d !== null).pop();
        if (lastSMA50 && sma50El) sma50El.textContent = '₹' + lastSMA50.value.toFixed(2);
    }
    
    // Calculate and display SMA 200 if enough data exists
    if (currentData.length >= 200) {
        const sma200 = calculateSMA(currentData, 200, smaStartDate);
        const lastSMA200 = sma200.filter(d => d !== null).pop();
        if (lastSMA200 && sma200El) sma200El.textContent = '₹' + lastSMA200.value.toFixed(2);
    }
    
    // Calculate and display RSI with color coding
    const rsi = calculateRSI(currentData);
    const validRSI = rsi.filter(d => d !== null);
    if (validRSI.length > 0 && rsiEl) {
        const lastRSI = validRSI[validRSI.length - 1];
        rsiEl.textContent = lastRSI.value.toFixed(1);
        // Color based on overbought (>70) or oversold (<30)
        rsiEl.style.color = lastRSI.value > 70 ? 'var(--accent-red)' : 
                          lastRSI.value < 30 ? 'var(--accent-green)' : 'var(--text-primary)';
    }
    
    // Calculate and display MACD values
    const macd = calculateMACD(currentData);
    const validMACD = macd.macdLine.filter(d => d !== null);
    const validSignal = macd.signalLine.filter(d => d !== null);
    if (validMACD.length > 0 && macdEl) {
        macdEl.textContent = validMACD[validMACD.length - 1].value.toFixed(3);
    }
    if (validSignal.length > 0 && signalEl) {
        signalEl.textContent = validSignal[validSignal.length - 1].value.toFixed(3);
    }
    
    updateCalculationsPanel();
}


/* -----------------------------------------------------------------------------
   9A. CALCULATIONS PANEL
   ----------------------------------------------------------------------------- */

let currentCalcTab = 'sma';

function initCalculationsPanel() {
    document.querySelectorAll('.calc-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCalcTab = tab.dataset.calc;
            updateCalculationsPanel();
        });
    });
    updateCalculationsPanel();
}

function updateCalculationsPanel() {
    const content = document.getElementById('calculationsContent');
    if (!content || currentData.length === 0) {
        if (content) content.innerHTML = '<div class="calc-empty">No data available</div>';
        return;
    }
    
    switch(currentCalcTab) {
        case 'sma': renderSMACalculations(content); break;
        case 'rsi': renderRSICalculations(content); break;
        case 'macd': renderMACDCalculations(content); break;
        case 'bb': renderBollingerCalculations(content); break;
        case 'stats': renderStatsCalculations(content); break;
    }
}

function renderSMACalculations(container) {
    const sma50 = calculateSMA(currentData, 50);
    const sma200 = calculateSMA(currentData, 200);
    const last50 = sma50.filter(d => d !== null).pop();
    const last200 = sma200.filter(d => d !== null).pop();
    
    const latestIdx = currentData.length - 1;
    const prices50 = currentData.slice(latestIdx - 49, latestIdx + 1);
    const prices200 = currentData.slice(latestIdx - 199, latestIdx + 1);
    
    const sum50 = prices50.reduce((a,b) => a + b.price, 0);
    const sum200 = prices200.reduce((a,b) => a + b.price, 0);
    
    let priceData50 = '';
    if (prices50.length <= 10) {
        priceData50 = prices50.map((p, i) => `P${i+1}: ₹${p.price.toFixed(2)}`).join(' + ');
    } else {
        priceData50 = prices50.slice(0, 5).map((p, i) => `P${i+1}: ₹${p.price.toFixed(2)}`).join(' + ') + ' + ... + ' + prices50.slice(-5).map((p, i) => `P${prices50.length-5+i+1}: ₹${p.price.toFixed(2)}`).join(' + ');
    }
    
    let priceData200 = '';
    if (prices200.length <= 10) {
        priceData200 = prices200.map((p, i) => `P${i+1}: ₹${p.price.toFixed(2)}`).join(' + ');
    } else {
        priceData200 = prices200.slice(0, 5).map((p, i) => `P${i+1}: ₹${p.price.toFixed(2)}`).join(' + ') + ' + ... + ' + prices200.slice(-5).map((p, i) => `P${prices200.length-5+i+1}: ₹${p.price.toFixed(2)}`).join(' + ');
    }
    
    let html = `
        <div class="calc-section">
            <div class="calc-section-title">SMA 50 Calculation</div>
            <div class="calc-formula">SMA = (P₁ + P₂ + ... + Pₙ) / n</div>
            <table class="calc-data-table">
                <tr><th>Parameter</th><th>Value</th></tr>
                <tr><td>Period (n)</td><td>50</td></tr>
                <tr><td>Start Date</td><td>${prices50[0].date}</td></tr>
                <tr><td>End Date</td><td>${prices50[prices50.length-1].date}</td></tr>
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">1</span>
                    <span class="step-content">Collect last 50 closing prices (P₁ to P₅₀):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem; word-break: break-all;">${priceData50}</div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">2</span>
                    <span class="step-content">Add all prices (Sum):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                = ${sum50.toFixed(2)}
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">3</span>
                    <span class="step-content">Divide by period (50):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                = ${sum50.toFixed(2)} / 50 = <span class="highlight">₹${last50 ? last50.value.toFixed(2) : 'N/A'}</span>
            </div>
            
            <div class="calc-result">
                <span class="calc-result-label">SMA 50 Value</span>
                <span class="calc-result-value">₹${last50 ? last50.value.toFixed(2) : 'N/A'}</span>
            </div>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">SMA 200 Calculation</div>
            <div class="calc-formula">SMA = (P₁ + P₂ + ... + P₂₀₀) / 200</div>
            <table class="calc-data-table">
                <tr><th>Parameter</th><th>Value</th></tr>
                <tr><td>Period (n)</td><td>200</td></tr>
                <tr><td>Start Date</td><td>${prices200[0].date}</td></tr>
                <tr><td>End Date</td><td>${prices200[prices200.length-1].date}</td></tr>
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">1</span>
                    <span class="step-content">Collect last 200 closing prices (showing first 5 + last 5):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem; word-break: break-all;">${priceData200}</div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">2</span>
                    <span class="step-content">Add all prices (Sum):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                = ${sum200.toFixed(2)}
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">3</span>
                    <span class="step-content">Divide by period (200):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                = ${sum200.toFixed(2)} / 200 = <span class="highlight">₹${last200 ? last200.value.toFixed(2) : 'N/A'}</span>
            </div>
            
            <div class="calc-result">
                <span class="calc-result-label">SMA 200 Value</span>
                <span class="calc-result-value">₹${last200 ? last200.value.toFixed(2) : 'N/A'}</span>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function renderRSICalculations(container) {
    const rsi = calculateRSI(currentData, 14);
    const validRSI = rsi.filter(d => d !== null);
    const lastRSI = validRSI.length > 0 ? validRSI[validRSI.length - 1] : null;
    
    const latestIdx = currentData.length - 1;
    const periods = 14;
    const gains = [];
    const losses = [];
    const changes = [];
    
    for (let i = latestIdx - periods + 1; i <= latestIdx; i++) {
        if (i > 0) {
            const change = currentData[i].price - currentData[i-1].price;
            const prevPrice = currentData[i-1].price;
            changes.push({ date: currentData[i].date, prevDate: currentData[i-1].date, price: currentData[i].price, prevPrice: prevPrice, change: change });
            gains.push(change > 0 ? change : 0);
            losses.push(change < 0 ? Math.abs(change) : 0);
        }
    }
    
    // For demonstration, show first RSI calculation (simple average) as educational
    const firstAvgGain = gains.reduce((a,b) => a+b, 0) / periods;
    const firstAvgLoss = losses.reduce((a,b) => a+b, 0) / periods;
    const firstRS = firstAvgLoss === 0 ? 100 : firstAvgGain / firstAvgLoss;
    const firstRSI = firstAvgLoss === 0 ? 100 : 100 - (100 / (1 + firstRS));
    
    // The actual RSI uses Wilder's smoothing - use the calculated value from the function
    const actualRSI = lastRSI ? lastRSI.value : firstRSI;
    
    let status = 'Neutral';
    let statusClass = '';
    if (actualRSI > 70) { status = 'Overbought'; statusClass = 'rsi-overbought'; }
    else if (actualRSI < 30) { status = 'Oversold'; statusClass = 'rsi-oversold'; }
    
    let changesHtml = changes.map((c, i) => `<tr><td>${i+1}</td><td>${c.prevDate}</td><td>₹${c.prevPrice.toFixed(2)}</td><td>₹${c.price.toFixed(2)}</td><td class="${c.change >= 0 ? 'hist-positive' : 'hist-negative'}">${c.change >= 0 ? '+' : ''}${c.change.toFixed(2)}</td></tr>`).join('');
    
    let gainsLossesHtml = '';
    if (periods <= 10) {
        gainsLossesHtml = changes.map((c, i) => 
            `<tr><td>${i+1}</td><td>Gain: ${c.change > 0 ? c.change.toFixed(2) : '0.00'}</td><td>Loss: ${c.change < 0 ? Math.abs(c.change).toFixed(2) : '0.00'}</td></tr>`
        ).join('');
    } else {
        gainsLossesHtml = changes.slice(0, 5).map((c, i) => 
            `<tr><td>${i+1}</td><td>Gain: ${c.change > 0 ? c.change.toFixed(2) : '0.00'}</td><td>Loss: ${c.change < 0 ? Math.abs(c.change).toFixed(2) : '0.00'}</td></tr>`
        ).join('') + '<tr><td colspan="3" style="text-align:center">... (showing 5 of 14)</td></tr>' + 
        changes.slice(-5).map((c, i) => 
            `<tr><td>${10+i}</td><td>Gain: ${c.change > 0 ? c.change.toFixed(2) : '0.00'}</td><td>Loss: ${c.change < 0 ? Math.abs(c.change).toFixed(2) : '0.00'}</td></tr>`
        ).join('');
    }
    
    let html = `
        <div class="calc-section">
            <div class="calc-section-title">RSI (Relative Strength Index) - Wilder's Smoothing</div>
            <div class="calc-formula">RSI = 100 - (100 / (1 + RS)) where RS = Avg Gain / Avg Loss</div>
            <div class="calc-formula" style="color: var(--accent-orange); font-size: 0.7rem; margin-top: 4px;">
                Note: RSI uses Wilder's Smoothing: Avg = (PrevAvg × 13 + Current) / 14
            </div>
            <table class="calc-data-table">
                <tr><th>Parameter</th><th>Value</th></tr>
                <tr><td>Period</td><td>${periods}</td></tr>
                <tr><td>Current Date</td><td>${currentData[latestIdx].date}</td></tr>
                <tr><td>Start Date</td><td>${changes[0].prevDate}</td></tr>
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">1</span>
                    <span class="step-content">Calculate price changes (Current - Previous) for each period:</span>
                </div>
            </div>
            <table class="calc-data-table" style="font-size: 0.7rem;">
                <tr><th>#</th><th>Prev Date</th><th>Prev Price</th><th>Current Price</th><th>Change</th></tr>
                ${changesHtml}
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">2</span>
                    <span class="step-content">Separate Gains (positive changes) and Losses (negative changes):</span>
                </div>
            </div>
            <table class="calc-data-table" style="font-size: 0.7rem;">
                <tr><th>#</th><th>Gain</th><th>Loss</th></tr>
                ${gainsLossesHtml}
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">3</span>
                    <span class="step-content">Calculate Total Gains and Total Losses:</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Total Gains = ${gains.map(g => g.toFixed(2)).join(' + ')} = <span class="highlight">${gains.reduce((a,b)=>a+b,0).toFixed(2)}</span><br>
                Total Losses = ${losses.map(l => l.toFixed(2)).join(' + ')} = <span class="highlight">${losses.reduce((a,b)=>a+b,0).toFixed(2)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">4</span>
                    <span class="step-content">Calculate Average Gain and Average Loss (Wilder's Smoothing):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                First Avg Gain = ${gains.reduce((a,b)=>a+b,0).toFixed(2)} / ${periods} = <span class="highlight">${firstAvgGain.toFixed(4)}</span><br>
                First Avg Loss = ${losses.reduce((a,b)=>a+b,0).toFixed(2)} / ${periods} = <span class="highlight">${firstAvgLoss.toFixed(4)}</span>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem; color: var(--accent-orange);">
                Subsequent values use: Avg = (PrevAvg × 13 + Current) / 14
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">5</span>
                    <span class="step-content">Calculate RS (Relative Strength):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                RS = Avg Gain / Avg Loss = ${firstAvgGain.toFixed(4)} / ${firstAvgLoss.toFixed(4)} = <span class="highlight">${firstRS.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">6</span>
                    <span class="step-content">Calculate RSI (with Wilder's smoothing applied):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                RSI = 100 - (100 / (1 + ${firstRS.toFixed(4)}))<br>
                RSI = <span class="highlight">${actualRSI.toFixed(2)}</span> (using Wilder's smoothing)
            </div>
            
            <div class="calc-result">
                <span class="calc-result-label">RSI Value (${status})</span>
                <span class="calc-result-value ${statusClass}">${actualRSI.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">RSI Interpretation</div>
            <table class="calc-data-table">
                <tr><th>Range</th><th>Signal</th></tr>
                <tr><td>0 - 30</td><td class="hist-positive">Oversold (Buy Signal)</td></tr>
                <tr><td>30 - 70</td><td>Neutral</td></tr>
                <tr><td>70 - 100</td><td class="hist-negative">Overbought (Sell Signal)</td></tr>
            </table>
        </div>
    `;
    container.innerHTML = html;
}

function renderMACDCalculations(container) {
    const macd = calculateMACD(currentData, 12, 26, 9);
    const validMACD = macd.macdLine.filter(d => d !== null);
    const validSignal = macd.signalLine.filter(d => d !== null);
    const lastMACD = validMACD.length > 0 ? validMACD[validMACD.length - 1] : null;
    const lastSignal = validSignal.length > 0 ? validSignal[validSignal.length - 1] : null;
    const lastHist = macd.histogram.filter(d => d !== null).pop();
    
    const ema12 = calculateEMA(currentData, 12);
    const ema26 = calculateEMA(currentData, 26);
    const latestIdx = currentData.length - 1;
    
    const prices12 = currentData.slice(latestIdx - 11, latestIdx + 1).map(d => d.price);
    const prices26 = currentData.slice(latestIdx - 25, latestIdx + 1).map(d => d.price);
    
    const val12 = ema12[latestIdx] ? ema12[latestIdx].value : 0;
    const val26 = ema26[latestIdx] ? ema26[latestIdx].value : 0;
    const macdLine = val12 - val26;
    
    const k12 = 2 / (12 + 1);
    const k26 = 2 / (26 + 1);
    
    const sma12 = prices12.reduce((a,b) => a+b, 0) / 12;
    const sma26 = prices26.reduce((a,b) => a+b, 0) / 26;
    
    let prices12Str = prices12.length <= 8 ? prices12.map((p, i) => `P${i+1}: ₹${p.toFixed(2)}`).join(' + ') : 
        prices12.slice(0, 4).map((p, i) => `P${i+1}: ₹${p.toFixed(2)}`).join(' + ') + ' + ... + ' + prices12.slice(-4).map((p, i) => `P${prices12.length-4+i+1}: ₹${p.toFixed(2)}`).join(' + ');
    
    let prices26Str = prices26.length <= 10 ? prices26.map((p, i) => `P${i+1}: ₹${p.toFixed(2)}`).join(' + ') : 
        prices26.slice(0, 5).map((p, i) => `P${i+1}: ₹${p.toFixed(2)}`).join(' + ') + ' + ... + ' + prices26.slice(-5).map((p, i) => `P${prices26.length-5+i+1}: ₹${p.toFixed(2)}`).join(' + ');
    
    let html = `
        <div class="calc-section">
            <div class="calc-section-title">MACD (Moving Average Convergence Divergence)</div>
            <div class="calc-formula">MACD Line = EMA₁₂ - EMA₂₆ | Signal = EMA₉(MACD) | Histogram = MACD - Signal</div>
            <table class="calc-data-table">
                <tr><th>Parameter</th><th>Value</th></tr>
                <tr><td>Fast EMA</td><td>12 periods</td></tr>
                <tr><td>Slow EMA</td><td>26 periods</td></tr>
                <tr><td>Signal Line</td><td>9 periods</td></tr>
                <tr><td>Multiplier (k)</td><td>2/(n+1)</td></tr>
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">1</span>
                    <span class="step-content">Calculate EMA 12 (Multiplier k = 2/13 = ${k12.toFixed(4)}):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem; word-break: break-all;">
                First EMA = SMA of first 12 prices:<br>
                = (${prices12.map(p => p.toFixed(2)).join(' + ')}) / 12<br>
                = ${prices12.reduce((a,b)=>a+b,0).toFixed(2)} / 12 = <span class="highlight">₹${sma12.toFixed(4)}</span>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem;">
                Subsequent EMA = (Price × k) + (Previous EMA × (1-k))<br>
                Latest EMA 12 = (Current Price × ${k12.toFixed(4)}) + (Previous EMA × ${(1-k12).toFixed(4)})<br>
                = <span class="highlight">₹${val12.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">2</span>
                    <span class="step-content">Calculate EMA 26 (Multiplier k = 2/27 = ${k26.toFixed(4)}):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem;">
                First EMA = SMA of first 26 prices = <span class="highlight">₹${sma26.toFixed(4)}</span>
            </div>
            <div class="calc-formula" style="font-size: 0.7rem;">
                Latest EMA 26 = (Current Price × ${k26.toFixed(4)}) + (Previous EMA × ${(1-k26).toFixed(4)})<br>
                = <span class="highlight">₹${val26.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">3</span>
                    <span class="step-content">Calculate MACD Line:</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                MACD = EMA₁₂ - EMA₂₆ = ₹${val12.toFixed(4)} - ₹${val26.toFixed(4)}<br>
                MACD = <span class="highlight">${macdLine.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">4</span>
                    <span class="step-content">Calculate Signal Line (EMA of MACD):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Signal = EMA₉ of MACD Line = <span class="highlight">${lastSignal ? lastSignal.value.toFixed(4) : 'N/A'}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">5</span>
                    <span class="step-content">Calculate Histogram:</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Histogram = MACD Line - Signal Line<br>
                = ${macdLine.toFixed(4)} - ${lastSignal ? lastSignal.value.toFixed(4) : 'N/A'}<br>
                = <span class="highlight">${lastHist ? lastHist.value.toFixed(4) : 'N/A'}</span>
            </div>
            
            <div class="calc-result">
                <span class="calc-result-label">MACD Line</span>
                <span class="calc-result-value">${lastMACD ? lastMACD.value.toFixed(4) : 'N/A'}</span>
            </div>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">MACD Components</div>
            <table class="calc-data-table">
                <tr><th>Component</th><th>Value</th><th>Interpretation</th></tr>
                <tr>
                    <td>EMA 12</td>
                    <td>₹${val12.toFixed(2)}</td>
                    <td>Fast moving average</td>
                </tr>
                <tr>
                    <td>EMA 26</td>
                    <td>₹${val26.toFixed(2)}</td>
                    <td>Slow moving average</td>
                </tr>
                <tr>
                    <td>MACD Line</td>
                    <td>${lastMACD ? lastMACD.value.toFixed(4) : 'N/A'}</td>
                    <td>${lastMACD && lastMACD.value > 0 ? 'Bullish (Above Zero)' : 'Bearish (Below Zero)'}</td>
                </tr>
                <tr>
                    <td>Signal Line</td>
                    <td>${lastSignal ? lastSignal.value.toFixed(4) : 'N/A'}</td>
                    <td>Trigger line</td>
                </tr>
                <tr>
                    <td>Histogram</td>
                    <td>${lastHist ? lastHist.value.toFixed(4) : 'N/A'}</td>
                    <td class="${lastHist && lastHist.value > 0 ? 'hist-positive' : 'hist-negative'}">${lastHist && lastHist.value > 0 ? 'Positive (Bullish)' : 'Negative (Bearish)'}</td>
                </tr>
            </table>
        </div>
    `;
    container.innerHTML = html;
}

function renderBollingerCalculations(container) {
    const bb = calculateBollingerBands(currentData, 20, 2);
    const latestIdx = currentData.length - 1;
    const upper = bb.upper[latestIdx];
    const middle = bb.sma[latestIdx];
    const lower = bb.lower[latestIdx];
    const currentPrice = currentData[latestIdx].price;
    
    const pricesData = currentData.slice(latestIdx - 19, latestIdx + 1);
    const prices = pricesData.map(d => d.price);
    const mean = prices.reduce((a,b) => a+b, 0) / 20;
    const variance = prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / 20;
    const stdDev = Math.sqrt(variance);
    
    let priceTable = '';
    if (prices.length <= 10) {
        priceTable = prices.map((p, i) => `<tr><td>P${i+1}</td><td>${pricesData[i].date}</td><td>₹${p.toFixed(2)}</td><td>₹${(p - mean).toFixed(2)}</td><td>${Math.pow(p - mean, 2).toFixed(4)}</td></tr>`).join('');
    } else {
        priceTable = prices.slice(0, 5).map((p, i) => `<tr><td>P${i+1}</td><td>${pricesData[i].date}</td><td>₹${p.toFixed(2)}</td><td>₹${(p - mean).toFixed(2)}</td><td>${Math.pow(p - mean, 2).toFixed(4)}</td></tr>`).join('') +
            '<tr><td colspan="5" style="text-align:center">... (showing 5 of 20)</td></tr>' +
            prices.slice(-5).map((p, i) => `<tr><td>P${16+i}</td><td>${pricesData[15+i].date}</td><td>₹${p.toFixed(2)}</td><td>₹${(p - mean).toFixed(2)}</td><td>${Math.pow(p - mean, 2).toFixed(4)}</td></tr>`).join('');
    }
    
    let html = `
        <div class="calc-section">
            <div class="calc-section-title">Bollinger Bands (20, 2)</div>
            <div class="calc-formula">Upper = SMA + (2 × σ) | Middle = SMA₂₀ | Lower = SMA - (2 × σ)</div>
            <table class="calc-data-table">
                <tr><th>Parameter</th><th>Value</th></tr>
                <tr><td>Period (SMA)</td><td>20</td></tr>
                <tr><td>Standard Deviations</td><td>2</td></tr>
                <tr><td>Current Date</td><td>${currentData[latestIdx].date}</td></tr>
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">1</span>
                    <span class="step-content">Collect last 20 closing prices and calculate Mean (SMA 20):</span>
                </div>
            </div>
            <table class="calc-data-table" style="font-size: 0.65rem;">
                <tr><th>#</th><th>Date</th><th>Price (x)</th><th>x - μ</th><th>(x - μ)²</th></tr>
                ${priceTable}
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">2</span>
                    <span class="step-content">Calculate Mean (SMA 20):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Sum of prices = ${prices.reduce((a,b)=>a+b,0).toFixed(2)}<br>
                Mean (μ) = ${prices.reduce((a,b)=>a+b,0).toFixed(2)} / 20 = <span class="highlight">₹${mean.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">3</span>
                    <span class="step-content">Calculate Variance and Standard Deviation:</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Variance (σ²) = Σ(x - μ)² / n<br>
                = ${prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0).toFixed(4)} / 20<br>
                = ${variance.toFixed(4)}
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Std Dev (σ) = √${variance.toFixed(4)} = <span class="highlight">${stdDev.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">4</span>
                    <span class="step-content">Calculate Upper and Lower Bands:</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Upper Band = μ + (2 × σ) = ${mean.toFixed(4)} + (2 × ${stdDev.toFixed(4)})<br>
                = ${mean.toFixed(4)} + ${(2 * stdDev).toFixed(4)} = <span class="highlight">₹${upper.value.toFixed(2)}</span>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Middle Band = μ = <span class="highlight">₹${middle.value.toFixed(2)}</span>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                Lower Band = μ - (2 × σ) = ${mean.toFixed(4)} - (2 × ${stdDev.toFixed(4)})<br>
                = ${mean.toFixed(4)} - ${(2 * stdDev).toFixed(4)} = <span class="highlight">₹${lower.value.toFixed(2)}</span>
            </div>
            
            <div class="calc-result">
                <span class="calc-result-label">Current Price</span>
                <span class="calc-result-value">₹${currentPrice.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">Bollinger Bands Values</div>
            <table class="calc-data-table">
                <tr><th>Band</th><th>Value</th><th>Position</th></tr>
                <tr><td>Upper Band</td><td>₹${upper.value.toFixed(2)}</td><td>${currentPrice >= upper.value ? '<span class="hist-negative">Above (Overbought)</span>' : 'Below'}</td></tr>
                <tr><td>Middle Band (SMA 20)</td><td>₹${middle.value.toFixed(2)}</td><td>Moving Average</td></tr>
                <tr><td>Lower Band</td><td>₹${lower.value.toFixed(2)}</td><td>${currentPrice <= lower.value ? '<span class="hist-positive">Below (Oversold)</span>' : 'Above'}</td></tr>
                <tr><td>Band Width</td><td>₹${(upper.value - lower.value).toFixed(2)}</td><td>${(upper.value - lower.value).toFixed(2)} / ${currentPrice.toFixed(2)} = ${((upper.value - lower.value) / currentPrice * 100).toFixed(1)}%</td></tr>
            </table>
        </div>
    `;
    container.innerHTML = html;
}

function renderStatsCalculations(container) {
    const prices = currentData.map(d => d.price);
    const volumes = currentData.map(d => d.vol);
    const changes = currentData.map(d => d.change);
    
    const n = prices.length;
    const mean = prices.reduce((a,b) => a+b, 0) / n;
    const variance = prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const meanVol = volumes.reduce((a,b) => a+b, 0) / n;
    const meanChange = changes.reduce((a,b) => a+b, 0) / n;
    
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    const cv = (stdDev / mean) * 100;
    
    let pricesHtml = '';
    if (n <= 15) {
        pricesHtml = prices.map((p, i) => `<tr><td>${i+1}</td><td>${currentData[i].date}</td><td>₹${p.toFixed(2)}</td><td>₹${(p - mean).toFixed(2)}</td><td>${Math.pow(p - mean, 2).toFixed(4)}</td></tr>`).join('');
    } else {
        pricesHtml = prices.slice(0, 8).map((p, i) => `<tr><td>${i+1}</td><td>${currentData[i].date}</td><td>₹${p.toFixed(2)}</td><td>₹${(p - mean).toFixed(2)}</td><td>${Math.pow(p - mean, 2).toFixed(4)}</td></tr>`).join('') +
            '<tr><td colspan="5" style="text-align:center">... (showing 8 of ' + n + ')</td></tr>' +
            prices.slice(-7).map((p, i) => `<tr><td>${n-7+i+1}</td><td>${currentData[n-7+i].date}</td><td>₹${p.toFixed(2)}</td><td>₹${(p - mean).toFixed(2)}</td><td>${Math.pow(p - mean, 2).toFixed(4)}</td></tr>`).join('');
    }
    
    let html = `
        <div class="calc-section">
            <div class="calc-section-title">Price Statistics - Detailed Calculation</div>
            <div class="calc-formula">Mean = Σx/n | Variance = Σ(x - μ)²/n | Std Dev = √Variance</div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">1</span>
                    <span class="step-content">List all ${n} prices and calculate deviation from mean:</span>
                </div>
            </div>
            <table class="calc-data-table" style="font-size: 0.6rem;">
                <tr><th>#</th><th>Date</th><th>Price (x)</th><th>x - μ</th><th>(x - μ)²</th></tr>
                ${pricesHtml}
            </table>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">2</span>
                    <span class="step-content">Calculate Mean (μ):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                μ = (${prices.slice(0, 5).map(p => p.toFixed(2)).join(' + ')} + ... + ${prices.slice(-3).map(p => p.toFixed(2)).join(' + ')}) / ${n}<br>
                μ = ${prices.reduce((a,b) => a+b, 0).toFixed(2)} / ${n} = <span class="highlight">₹${mean.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">3</span>
                    <span class="step-content">Calculate Variance (σ²):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                σ² = Σ(x - μ)² / n<br>
                σ² = ${prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0).toFixed(4)} / ${n} = <span class="highlight">${variance.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">4</span>
                    <span class="step-content">Calculate Standard Deviation (σ):</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                σ = √${variance.toFixed(4)} = <span class="highlight">₹${stdDev.toFixed(4)}</span>
            </div>
            
            <div class="calc-steps">
                <div class="calc-step">
                    <span class="step-number">5</span>
                    <span class="step-content">Calculate Coefficient of Variation:</span>
                </div>
            </div>
            <div class="calc-formula" style="font-size: 0.75rem;">
                CV = (σ / μ) × 100 = (${stdDev.toFixed(4)} / ${mean.toFixed(4)}) × 100 = <span class="highlight">${cv.toFixed(2)}%</span>
            </div>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">Summary Statistics</div>
            <table class="calc-data-table">
                <tr><th>Metric</th><th>Formula</th><th>Value</th></tr>
                <tr><td>Count (n)</td><td>Number of data points</td><td>${n}</td></tr>
                <tr><td>Sum of Prices</td><td>Σ Price</td><td>₹${prices.reduce((a,b) => a+b, 0).toFixed(2)}</td></tr>
                <tr><td>Mean (μ)</td><td>Σ Price / n</td><td class="highlight">₹${mean.toFixed(2)}</td></tr>
                <tr><td>Variance (σ²)</td><td>Σ(Price - μ)² / n</td><td>${variance.toFixed(4)}</td></tr>
                <tr><td>Std Dev (σ)</td><td>√Variance</td><td>₹${stdDev.toFixed(2)}</td></tr>
                <tr><td>Coefficient of Var</td><td>(σ / μ) × 100</td><td>${cv.toFixed(2)}%</td></tr>
            </table>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">Range Analysis</div>
            <table class="calc-data-table">
                <tr><th>Metric</th><th>Value</th><th>Date</th></tr>
                <tr><td>Minimum Price</td><td class="hist-positive">₹${min.toFixed(2)}</td><td>${currentData.find(d => d.price === min).date}</td></tr>
                <tr><td>Maximum Price</td><td class="hist-negative">₹${max.toFixed(2)}</td><td>${currentData.find(d => d.price === max).date}</td></tr>
                <tr><td>Range</td><td>₹${range.toFixed(2)}</td><td>${((range / min) * 100).toFixed(1)}% move</td></tr>
            </table>
        </div>
        
        <div class="calc-section">
            <div class="calc-section-title">Volume Statistics</div>
            <table class="calc-data-table">
                <tr><th>Metric</th><th>Calculation</th><th>Value</th></tr>
                <tr><td>Total Volume</td><td>Σ Volume</td><td>${(volumes.reduce((a,b) => a+b, 0) / 1000000).toFixed(2)}M</td></tr>
                <tr><td>Avg Volume</td><td>Total / ${n}</td><td>${(meanVol / 1000000).toFixed(2)}M</td></tr>
                <tr><td>Avg Change</td><td>Σ Change% / ${n}</td><td>${meanChange.toFixed(2)}%</td></tr>
            </table>
        </div>
    `;
    container.innerHTML = html;
}


/* -----------------------------------------------------------------------------
   9. TECHNICAL INDICATOR CALCULATIONS
   ----------------------------------------------------------------------------- */

/**
 * calculateSMA - Simple Moving Average
 * 
 * SMA = Sum of closing prices for N periods / N periods
 * Data is sorted newest to oldest (descending)
 * 
 * @param {Array} data - Array of stock data objects (sorted newest to oldest)
 * @param {number} period - Number of periods for SMA (e.g., 50, 200)
 * @param {Date} startDate - Optional start date from which SMA should be displayed
 * @returns {Array} - Array of {time, value} objects (null for insufficient data or before startDate)
 */
function calculateSMA(data, period, startDate = null) {
    const sma = [];
    // Use UTC to match the data timestamps which are in UTC
    const startTime = startDate ? Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : null;
    
    // Data is sorted oldest to newest (index 0 = oldest, last index = newest)
    // We iterate from oldest to newest
    for (let i = 0; i < data.length; i++) {
        const currentTime = data[i].time;
        
        // If current date is before startDate, don't show SMA
        if (startTime && currentTime < startTime) {
            sma.push(null);
            continue;
        }
        
        // Check if we have enough data points BEFORE this date (past data)
        // We need 'period' number of data points with indices i-period+1, i-period+2, ... i
        if (i < period - 1) {
            sma.push(null);
        } else {
            // Sum the previous 'period' prices (going to past dates)
            let sum = 0;
            for (let j = 0; j < period; j++) {
                sum += data[i - j].price;
            }
            sma.push({ time: currentTime, value: sum / period });
        }
    }
    return sma;
}

/**
 * calculateRSI - Relative Strength Index
 * 
 * RSI measures the magnitude of recent price changes to evaluate
 * overbought or oversold conditions.
 * Formula: RSI = 100 - (100 / (1 + RS))
 * RS = Average Gain / Average Loss
 * 
 * @param {Array} data - Array of stock data objects
 * @param {number} period - RSI period (default 14)
 * @returns {Array} - Array of {time, value} objects
 */
function calculateRSI(data, period = 14) {
    const rsi = [];
    const gains = [];
    const losses = [];
    
    // Calculate price changes between consecutive periods
    for (let i = 1; i < data.length; i++) {
        const change = data[i].price - data[i - 1].price;
        // Separate gains (positive changes) and losses (negative changes)
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    // Calculate initial average gain and loss
    let avgGain = 0, avgLoss = 0;
    for (let i = 0; i < period; i++) { 
        avgGain += gains[i]; 
        avgLoss += losses[i]; 
    }
    avgGain /= period; 
    avgLoss /= period;
    
    // First period RSI
    for (let i = 0; i < period - 1; i++) rsi.push(null);
    
    // Calculate RSI for remaining periods using smoothed averages
    for (let i = period; i < gains.length; i++) {
        if (avgLoss === 0) {
            // No losses - RSI is 100 (strong upward momentum)
            rsi.push({ time: data[i + 1].time, value: 100 });
        } else {
            // Calculate RS and convert to RSI
            const rs = avgGain / avgLoss;
            rsi.push({ time: data[i + 1].time, value: 100 - (100 / (1 + rs)) });
        }
        
        // Update averages using exponential smoothing
        avgGain = (avgGain * (period - 1) + gains[i]) / period;
        avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    }
    return rsi;
}

/**
 * calculateEMA - Exponential Moving Average
 * 
 * EMA gives more weight to recent prices, making it more responsive
 * to current market conditions than SMA.
 * Formula: EMA = (Price * k) + (Previous EMA * (1 - k))
 * where k = 2 / (period + 1)
 * 
 * @param {Array} data - Array of stock data objects
 * @param {number} period - EMA period
 * @returns {Array} - Array of {time, value} objects
 */
function calculateEMA(data, period) {
    const ema = [];
    const multiplier = 2 / (period + 1);  // Smoothing factor
    
    // Calculate initial SMA for first period
    let sum = 0;
    for (let i = 0; i < period; i++) sum += data[i].price;
    let prevEMA = sum / period;
    
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            // Not enough data
            ema.push(null);
        } else if (i === period - 1) {
            // Use SMA as first EMA value
            ema.push({ time: data[i].time, value: prevEMA });
        } else {
            // Calculate EMA using formula
            const emaValue = (data[i].price - prevEMA) * multiplier + prevEMA;
            ema.push({ time: data[i].time, value: emaValue });
            prevEMA = emaValue;
        }
    }
    return ema;
}

/**
 * calculateMACD - Moving Average Convergence Divergence
 * 
 * MACD is a trend-following momentum indicator showing the
 * relationship between two moving averages.
 * 
 * Components:
 * - MACD Line: Fast EMA - Slow EMA
 * - Signal Line: EMA of MACD Line
 * - Histogram: MACD Line - Signal Line
 * 
 * Default parameters: Fast=12, Slow=26, Signal=9
 * 
 * @param {Array} data - Array of stock data objects
 * @param {number} fastPeriod - Fast EMA period (default 12)
 * @param {number} slowPeriod - Slow EMA period (default 26)
 * @param {number} signalPeriod - Signal line period (default 9)
 * @returns {Object} - Object with macdLine, signalLine, and histogram arrays
 */
function calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    // Calculate fast and slow EMAs
    const fastEMA = calculateEMA(data, fastPeriod);
    const slowEMA = calculateEMA(data, slowPeriod);
    
    // Calculate MACD line (Fast EMA - Slow EMA)
    const macdLine = [];
    for (let i = 0; i < data.length; i++) {
        if (fastEMA[i] === null || slowEMA[i] === null) {
            macdLine.push(null);
        } else {
            macdLine.push({ 
                time: data[i].time, 
                value: fastEMA[i].value - slowEMA[i].value 
            });
        }
    }
    
    // Calculate Signal line (EMA of MACD)
    const signalLine = [];
    const histogram = [];
    
    // Get valid MACD values for signal calculation
    const validMACD = macdLine.filter(m => m !== null);
    
    // Calculate initial signal (simple average of first N values)
    let signalSum = 0;
    for (let i = 0; i < Math.min(signalPeriod, validMACD.length); i++) {
        signalSum += validMACD[i].value;
    }
    let prevSignal = signalSum / Math.min(signalPeriod, validMACD.length);
    
    let signalIdx = 0;
    const signalMultiplier = 2 / (signalPeriod + 1);
    
    for (let i = 0; i < data.length; i++) {
        if (macdLine[i] === null) {
            continue;
        } else {
            if (signalIdx < signalPeriod - 1) {
                // Not enough MACD values yet
                signalLine.push(null);
                histogram.push(null);
            } else if (signalIdx === signalPeriod - 1) {
                // First signal line value
                signalLine.push({ time: data[i].time, value: prevSignal });
                histogram.push({ 
                    time: data[i].time, 
                    value: macdLine[i].value - prevSignal 
                });
            } else {
                // Calculate signal using EMA formula
                const sig = (macdLine[i].value - prevSignal) * signalMultiplier + prevSignal;
                signalLine.push({ time: data[i].time, value: sig });
                histogram.push({ 
                    time: data[i].time, 
                    value: macdLine[i].value - sig 
                });
                prevSignal = sig;
            }
            signalIdx++;
        }
    }
    return { macdLine, signalLine, histogram };
}

/**
 * calculateBollingerBands - Bollinger Bands
 * 
 * Bollinger Bands are volatility bands placed above and below a moving average.
 * They consist of:
 * - Upper Band: Middle Band + (N * Standard Deviation)
 * - Middle Band: N-period Simple Moving Average
 * - Lower Band: Middle Band - (N * Standard Deviation)
 * 
 * Default parameters: Period=20, Standard Deviations=2
 * 
 * @param {Array} data - Array of stock data objects
 * @param {number} period - Period for SMA and std dev calculation (default 20)
 * @param {number} stdDev - Number of standard deviations (default 2)
 * @returns {Object} - Object with sma, upper, and lower arrays
 */
function calculateBollingerBands(data, period = 20, stdDev = 2) {
    // First calculate SMA (middle band)
    const sma = calculateSMA(data, period);
    const upper = [];
    const lower = [];
    
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            // Not enough data
            upper.push(null);
            lower.push(null);
        } else {
            // Get slice of prices for this period
            const slice = data.slice(i - period + 1, i + 1);
            
            // Calculate mean
            const mean = slice.reduce((sum, d) => sum + d.price, 0) / period;
            
            // Calculate variance and standard deviation
            const variance = slice.reduce((sum, d) => sum + Math.pow(d.price - mean, 2), 0) / period;
            const std = Math.sqrt(variance);
            
            // Calculate upper and lower bands
            upper.push({ 
                time: data[i].time, 
                value: mean + stdDev * std 
            });
            lower.push({ 
                time: data[i].time, 
                value: mean - stdDev * std 
            });
        }
    }
    
    // Return sma slice as middle band, plus upper and lower
    return { sma: sma.slice(), upper, lower };
}


/* -----------------------------------------------------------------------------
   10. STATISTICS TABLE CALCULATION
   ----------------------------------------------------------------------------- */

/**
 * calculateStatsAnalysis - Calculates mean and variance for all variables
 * 
 * Computes daily, weekly, and monthly statistics for:
 * - Close Price
 * - Open Price
 * - High Price
 * - Low Price
 * - Volume
 * - Change %
 * 
 * Displays results in the statistics table.
 */
function calculateStatsAnalysis() {
    // Define variables to analyze
    const variables = [
        { key: 'price', name: 'Close Price', format: v => '₹' + v.toFixed(2) },
        { key: 'open', name: 'Open Price', format: v => '₹' + v.toFixed(2) },
        { key: 'high', name: 'High Price', format: v => '₹' + v.toFixed(2) },
        { key: 'low', name: 'Low Price', format: v => '₹' + v.toFixed(2) },
        { key: 'vol', name: 'Volume', format: v => (v / 1000000).toFixed(2) + 'M' },
        { key: 'change', name: 'Change %', format: v => v.toFixed(2) + '%' }
    ];
    
    // Define time ranges
    const ranges = [
        { key: 'day', name: 'Daily' },
        { key: 'week', name: 'Weekly' },
        { key: 'month', name: 'Monthly' }
    ];
    
    // Object to store calculated statistics
    const stats = {};
    
    // Calculate statistics for each range
    ranges.forEach(range => {
        const data = datasets[range.key];
        if (!data || data.length === 0) return;
        
        stats[range.key] = {};
        
        // Calculate mean and variance for each variable
        variables.forEach(varInfo => {
            const values = data.map(d => d[varInfo.key]);
            const n = values.length;
            
            // Calculate mean (average)
            const mean = values.reduce((a, b) => a + b, 0) / n;
            
            // Calculate variance (average of squared differences from mean)
            const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n;
            
            // Store with format function
            stats[range.key][varInfo.key] = { mean, variance, format: varInfo.format };
        });
    });
    
    // Build HTML for table
    let html = '';
    
    variables.forEach(varInfo => {
        html += '<tr>';
        html += `<td class="variable">${varInfo.name}</td>`;
        
        // Add columns for each time range
        ranges.forEach(range => {
            if (stats[range.key] && stats[range.key][varInfo.key]) {
                const s = stats[range.key][varInfo.key];
                html += `<td class="mean">${s.format(s.mean)}</td>`;
                html += `<td class="variance">${s.format(s.variance)}</td>`;
            } else {
                html += '<td>-</td><td>-</td>';
            }
        });
        
        html += '</tr>';
    });
    
    // Insert HTML into table body
    document.getElementById('statsTableBody').innerHTML = html;
}


/* -----------------------------------------------------------------------------
   11. CHART RENDERING
   ----------------------------------------------------------------------------- */

/**
 * updateCharts - Creates and renders all charts using Lightweight Charts
 * 
 * Creates:
 * - Candlestick chart (main price chart)
 * - Line chart (alternative view)
 * - Volume histogram
 * - RSI chart
 * - MACD chart
 * 
 * Also sets up:
 * - Crosshair tooltip
 * - Indicator overlays (SMA, Bollinger Bands)
 * - Time scale synchronization between charts
 */
function updateCharts() {
    // Guard clause - no data to display
    if (!currentData || currentData.length === 0) return;
    
    // Get theme colors
    const isDark = currentTheme === 'dark';
    const chartBg = isDark ? '#1e1e20' : '#ffffff';
    const chartText = isDark ? '#8e8e93' : '#6e6e73';
    const chartGrid = isDark ? '#2c2c2e' : '#e5e5ea';
    
    // Prepare data in format expected by Lightweight Charts
    const candleData = currentData.map(d => ({ 
        time: d.time, 
        open: d.open, 
        high: d.high, 
        low: d.low, 
        close: d.price 
    }));
    const lineData = currentData.map(d => ({ 
        time: d.time, 
        value: d.price 
    }));
    
    // Remove existing charts to prevent memory leaks and conflicts
    if (candleChart) { candleChart.remove(); candleChart = null; }
    if (lineChart) { lineChart.remove(); lineChart = null; }
    if (volumeChart) { volumeChart.remove(); volumeChart = null; }
    if (rsiChart) { rsiChart.remove(); rsiChart = null; }
    if (macdChart) { macdChart.remove(); macdChart = null; }
    
    // Set chart height
    const chartHeight = 500;
    
    // =========================================================================
    // CREATE MAIN CANDLESTICK CHART
    // =========================================================================
    
    // Initialize chart with theme-aware colors
    candleChart = LightweightCharts.createChart(document.getElementById('candleChart'), {
        // Layout configuration
        layout: { 
            background: { color: chartBg }, 
            textColor: chartText 
        },
        // Grid lines
        grid: { 
            vertLines: { color: chartGrid }, 
            horzLines: { color: chartGrid } 
        },
        // Crosshair configuration
        crosshair: { 
            mode: LightweightCharts.CrosshairMode.Normal, 
            vertLine: { 
                color: '#0a84ff', 
                width: 1, 
                style: 2, 
                labelBackgroundColor: '#0a84ff' 
            }, 
            horzLine: { 
                color: '#0a84ff', 
                width: 1, 
                style: 2, 
                labelBackgroundColor: '#0a84ff' 
            } 
        },
        // Right price scale
        rightPriceScale: { 
            borderColor: isDark ? '#38383a' : '#d2d2d7', 
            scaleMargins: { top: 0.1, bottom: 0.15 }, 
            width: 70 
        },
        // Time scale configuration
        timeScale: { 
            borderColor: isDark ? '#38383a' : '#d2d2d7', 
            timeVisible: true, 
            tickMarkFormatter: (time) => {
                const date = new Date(time);
                return date.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: '2-digit' 
                });
            } 
        }
    });
    
    // Add candlestick series with green/red colors
    const candlestickSeries = candleChart.addCandlestickSeries({
        upColor: '#30d158', 
        downColor: '#ff453a', 
        borderUpColor: '#30d158', 
        borderDownColor: '#ff453a', 
        wickUpColor: '#30d158', 
        wickDownColor: '#ff453a'
    });
    candlestickSeries.setData(candleData);
    
    // =========================================================================
    // ADD TECHNICAL INDICATORS TO CANDLESTICK CHART
    // =========================================================================
    
    // Get SMA start date based on current range
    const smaStartDates = {
        day: new Date('2025-04-01'),
        week: new Date('2023-10-29'),
        month: new Date('2022-10-31')
    };
    const smaStartDate = smaStartDates[currentRange] || null;
    
    // Add SMA lines if enabled
    if (activeIndicators.sma) {
        const sma50 = calculateSMA(currentData, 50, smaStartDate);
        const sma200 = calculateSMA(currentData, 200, smaStartDate);
        
        // SMA 50 line (green)
        const sma50Series = candleChart.addLineSeries({ 
            color: '#30d158', 
            lineWidth: 2, 
            priceLineVisible: false, 
            crosshairMarkerVisible: true, 
            title: 'SMA 50' 
        });
        sma50Series.setData(sma50.filter(d => d !== null));
        
        // SMA 200 line (orange)
        const sma200Series = candleChart.addLineSeries({ 
            color: '#ff9f0a', 
            lineWidth: 2, 
            priceLineVisible: false, 
            crosshairMarkerVisible: true, 
            title: 'SMA 200' 
        });
        sma200Series.setData(sma200.filter(d => d !== null));
    }
    
    // Add Bollinger Bands if enabled
    if (activeIndicators.bb) {
        const bb = calculateBollingerBands(currentData);
        
        // Upper band (purple)
        const bbUpperSeries = candleChart.addLineSeries({ 
            color: '#bf5af2', 
            lineWidth: 1, 
            priceLineVisible: false, 
            crosshairMarkerVisible: false, 
            title: 'BB Upper' 
        });
        bbUpperSeries.setData(bb.upper.filter(d => d !== null));
        
        // Middle band (semi-transparent purple)
        const bbMiddleSeries = candleChart.addLineSeries({ 
            color: 'rgba(191, 90, 242, 0.6)', 
            lineWidth: 1, 
            priceLineVisible: false, 
            crosshairMarkerVisible: false, 
            title: 'BB Middle' 
        });
        bbMiddleSeries.setData(bb.sma.filter(d => d !== null));
        
        // Lower band (purple)
        const bbLowerSeries = candleChart.addLineSeries({ 
            color: '#bf5af2', 
            lineWidth: 1, 
            priceLineVisible: false, 
            crosshairMarkerVisible: false, 
            title: 'BB Lower' 
        });
        bbLowerSeries.setData(bb.lower.filter(d => d !== null));
    }
    
    // =========================================================================
    // TOOLTIP ON CURSOR MOVE - Unified handler for all charts
    // =========================================================================
    
    const tooltip = document.getElementById('tooltip');
    
    // Function to generate tooltip HTML with all indicator data
    function generateTooltipHTML(idx, priceData) {
        try {
            if (idx < 0) return '';
            
            const data = currentData[idx];
            if (!data) return '';
            
            // Format date for display
            const date = new Date(data.time).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            });
            
            // Build active indicators badge
            let activeIndicatorsList = [];
            if (activeIndicators.sma) activeIndicatorsList.push('SMA');
            if (activeIndicators.bb) activeIndicatorsList.push('BB');
            if (activeIndicators.rsi) activeIndicatorsList.push('RSI');
            if (activeIndicators.macd) activeIndicatorsList.push('MACD');
            if (activeIndicators.volume) activeIndicatorsList.push('VOL');
            
            const indicatorsBadge = activeIndicatorsList.length > 0 
                ? `<span class="active-indicators-badge">${activeIndicatorsList.join(' • ')}</span>` 
                : '';
            
            let html = `
                <div class="tooltip-title-row">
                    <span class="tooltip-date">📅 ${date}</span>
                    ${indicatorsBadge}
                </div>
                <div class="tooltip-section">
                    <div class="tooltip-section-title">💰 Price</div>
            `;
            
            // Price data (candle or line)
            if (priceData && priceData.open !== undefined) {
                const isGreen = priceData.close >= priceData.open;
                html += `
                    <div class="tooltip-price-grid">
                        <div class="tooltip-price-item"><span class="tp-label">Open</span><span class="tp-value">₹${priceData.open.toFixed(2)}</span></div>
                        <div class="tooltip-price-item"><span class="tp-label">High</span><span class="tp-value tp-high">₹${priceData.high.toFixed(2)}</span></div>
                        <div class="tooltip-price-item"><span class="tp-label">Low</span><span class="tp-value tp-low">₹${priceData.low.toFixed(2)}</span></div>
                        <div class="tooltip-price-item"><span class="tp-label">Close</span><span class="tp-value ${isGreen ? 'tp-green' : 'tp-red'}">₹${priceData.close.toFixed(2)}</span></div>
                    </div>
                `;
            } else if (priceData && priceData.value !== undefined) {
                html += `<div class="tooltip-single-price">₹${priceData.value.toFixed(2)}</div>`;
            }
            
            html += `</div>`;
            
            // Get SMA start dates
            const smaStartDates = {
                day: new Date('2025-04-01'),
                week: new Date('2023-10-29'),
                month: new Date('2022-10-31')
            };
            const smaStartDate = smaStartDates[currentRange] || null;
            
            // Show SMA values if enabled
            if (activeIndicators.sma) {
                const sma50 = calculateSMA(currentData, 50, smaStartDate);
                const sma200 = calculateSMA(currentData, 200, smaStartDate);
                if (sma50[idx] || sma200[idx]) {
                    html += `<div class="tooltip-section"><div class="tooltip-section-title">📈 Moving Averages</div><div class="tooltip-indi-grid">`;
                    if (sma50[idx]) {
                        html += `<div class="tooltip-indi-item sma50-bg"><span class="ti-label">SMA 50</span><span class="ti-value">₹${sma50[idx].value.toFixed(2)}</span></div>`;
                    }
                    if (sma200[idx]) {
                        html += `<div class="tooltip-indi-item sma200-bg"><span class="ti-label">SMA 200</span><span class="ti-value">₹${sma200[idx].value.toFixed(2)}</span></div>`;
                    }
                    html += `</div></div>`;
                }
            }
            
            // Show Bollinger Bands if enabled
            if (activeIndicators.bb) {
                const bb = calculateBollingerBands(currentData);
                if (bb && bb.upper && bb.middle && bb.lower && bb.upper[idx] && bb.middle[idx] && bb.lower[idx]) {
                    html += `<div class="tooltip-section"><div class="tooltip-section-title">📊 Bollinger Bands</div><div class="tooltip-indi-grid">`;
                    html += `<div class="tooltip-indi-item bb-bg"><span class="ti-label">Upper</span><span class="ti-value">₹${bb.upper[idx].value.toFixed(2)}</span></div>`;
                    html += `<div class="tooltip-indi-item bb-bg"><span class="ti-label">Middle</span><span class="ti-value">₹${bb.middle[idx].value.toFixed(2)}</span></div>`;
                    html += `<div class="tooltip-indi-item bb-bg"><span class="ti-label">Lower</span><span class="ti-value">₹${bb.lower[idx].value.toFixed(2)}</span></div>`;
                    html += `</div></div>`;
                }
            }
            
            // Show RSI if enabled
            if (activeIndicators.rsi) {
                const rsi = calculateRSI(currentData);
                // RSI[i] has time = data[i+1].time (first RSI at index 13 has time = data[14].time)
                // So when hovering at data[idx], show rsi[idx-1]
                const rsiIdx = idx - 1;
                if (rsiIdx >= 0 && rsi[rsiIdx]) {
                    const rsiVal = rsi[rsiIdx].value;
                    let rsiStatus = '';
                    let rsiClass = 'rsi-neutral';
                    if (rsiVal > 70) { rsiStatus = 'Overbought'; rsiClass = 'rsi-overbought'; }
                    else if (rsiVal < 30) { rsiStatus = 'Oversold'; rsiClass = 'rsi-oversold'; }
                    else { rsiStatus = 'Neutral'; }
                    html += `<div class="tooltip-section"><div class="tooltip-section-title">📉 RSI</div>`;
                    html += `<div class="tooltip-rsi-display ${rsiClass}">
                        <span class="rsi-value">${rsiVal.toFixed(1)}</span>
                        <span class="rsi-status">${rsiStatus}</span>
                    </div></div>`;
                }
            }
            
            // Show MACD if enabled
            if (activeIndicators.macd) {
                const macd = calculateMACD(currentData);
                if (macd.macdLine[idx] && macd.macdLine[idx].value !== undefined && macd.signalLine[idx] && macd.signalLine[idx].value !== undefined) {
                    const hist = macd.histogram[idx] ? macd.histogram[idx].value : 0;
                    const histClass = hist >= 0 ? 'hist-positive' : 'hist-negative';
                    html += `<div class="tooltip-section"><div class="tooltip-section-title">📊 MACD</div><div class="tooltip-macd-grid">`;
                    html += `<div class="macd-item"><span class="mi-label">MACD Line</span><span class="mi-value">${macd.macdLine[idx].value.toFixed(4)}</span></div>`;
                    html += `<div class="macd-item"><span class="mi-label">Signal Line</span><span class="mi-value">${macd.signalLine[idx].value.toFixed(4)}</span></div>`;
                    html += `<div class="macd-item hist-item ${histClass}"><span class="mi-label">Histogram</span><span class="mi-value">${hist >= 0 ? '+' : ''}${hist.toFixed(4)}</span></div>`;
                    html += `</div></div>`;
                }
            }
            
            // Show volume if enabled
            if (activeIndicators.volume) {
                const volM = (data.vol / 1000000).toFixed(2);
                html += `<div class="tooltip-section"><div class="tooltip-section-title">📊 Volume</div>`;
                html += `<div class="tooltip-volume-display">
                    <span class="vol-value">${volM}M</span>
                </div></div>`;
            }
            
            // Show change percentage
            html += `<div class="tooltip-footer">
                <span class="change-label">Change</span>
                <span class="change-value ${data.change >= 0 ? 'hist-positive' : 'hist-negative'}">${data.change >= 0 ? '▲' : '▼'} ${Math.abs(data.change).toFixed(2)}%</span>
            </div>`;
            
            return html;
        } catch (e) {
            console.error('Tooltip error:', e);
            return '';
        }
    }
    
    // Function to position tooltip
    function positionTooltip(chartEl, pointX, pointY) {
        const tooltipWidth = tooltip.offsetWidth || 240;
        const tooltipHeight = tooltip.offsetHeight || 200;
        const chartRect = chartEl.getBoundingClientRect();
        
        // Position tooltip with dynamic offset based on its size
        const offsetX = 20;
        const offsetY = 20;
        
        let left = chartRect.left + pointX + offsetX;
        let top = chartRect.top + pointY + offsetY;
        
        // Adjust if tooltip would go off right edge
        if (left + tooltipWidth + 20 > window.innerWidth) {
            left = chartRect.left + pointX - tooltipWidth - 10;
        }
        
        // Adjust if tooltip would go off bottom edge
        if (top + tooltipHeight + 20 > window.innerHeight) {
            top = chartRect.top + pointY - tooltipHeight - 10;
        }
        
        // Adjust if tooltip would go off left edge
        if (left < 10) left = 10;
        
        // Adjust if tooltip would go off top edge
        if (top < 10) top = 10;
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    // Subscribe to candlestick chart crosshair
    if (candleChart) {
        candleChart.subscribeCrosshairMove((param) => {
            if (!param.time || !param.seriesData.size) { 
                tooltip.style.display = 'none'; 
                return; 
            }
            
            const data = param.seriesData.get(candlestickSeries);
            if (!data) return;
            
            // Find matching data point - convert times to same format for comparison
            let idx = -1;
            const paramTime = typeof param.time === 'number' ? param.time : new Date(param.time).getTime();
            
            idx = currentData.findIndex(d => d.time === paramTime);
            
            // If not found by exact match, try by date string
            if (idx === -1) {
                const paramDateStr = new Date(paramTime).toISOString().split('T')[0];
                idx = currentData.findIndex(d => {
                    return new Date(d.time).toISOString().split('T')[0] === paramDateStr;
                });
            }
            
            if (idx >= 0) {
                const html = generateTooltipHTML(idx, data);
                if (html) {
                    tooltip.innerHTML = html;
                    positionTooltip(document.getElementById('candleChart'), param.point.x, param.point.y);
                    tooltip.style.display = 'block';
                }
            }
        });
    }
    
    // Subscribe to line chart crosshair
    if (lineChart) {
        lineChart.subscribeCrosshairMove((param) => {
            if (!param.time || !param.seriesData.size) { 
                tooltip.style.display = 'none'; 
                return; 
            }
            
            const data = param.seriesData.get(lineAreaSeries);
            if (!data) return;
            
            let idx = -1;
            if (typeof param.time === 'number') {
                idx = currentData.findIndex(d => d.time === param.time);
            } else {
                const timeStr = param.time;
                idx = currentData.findIndex(d => {
                    const dDate = new Date(d.time);
                    const tDate = new Date(timeStr);
                    return dDate.toISOString().split('T')[0] === tDate.toISOString().split('T')[0];
                });
            }
            
            const html = generateTooltipHTML(idx, { value: data.value });
            
            if (html) {
                tooltip.innerHTML = html;
                positionTooltip(document.getElementById('lineChart'), param.point.x, param.point.y);
                tooltip.style.display = 'block';
            }
        });
    }
    
    // Fit chart content to view
    candleChart.timeScale().fitContent();
    
    // Resize chart to container width
    const candleContainer = document.getElementById('candleChart');
    candleChart.resize(candleContainer.clientWidth, chartHeight);
    
    // Get width for other charts
    const chartWidth = candleContainer.clientWidth;
    
    // =========================================================================
    // VOLUME CHART
    // =========================================================================
    
    if (activeIndicators.volume) {
        // Prepare volume data with color based on price change
        const volumeData = currentData.map(d => ({ 
            time: d.time, 
            value: d.vol, 
            color: d.change >= 0 ? 'rgba(48, 209, 88, 0.6)' : 'rgba(255, 69, 58, 0.6)' 
        }));
        
        // Calculate volume moving average
        const avgVol = currentData.reduce((s, d) => s + d.vol, 0) / currentData.length;
        const volumeMA = currentData.map((d, i) => {
            if (i < 20) return null;
            const slice = currentData.slice(i - 20, i);
            return { time: d.time, value: slice.reduce((s, x) => s + x.vol, 0) / 20 };
        });
        
        // Create volume chart
        volumeChart = LightweightCharts.createChart(document.getElementById('volumeChart'), {
            layout: { background: { color: chartBg }, textColor: chartText },
            grid: { vertLines: { color: chartGrid }, horzLines: { color: chartGrid } },
            rightPriceScale: { borderColor: isDark ? '#38383a' : '#d2d2d7', width: 70 },
            timeScale: { borderColor: isDark ? '#38383a' : '#d2d2d7', timeVisible: true },
            height: 500,
            width: chartWidth
        });
        
        // Add histogram series for volume bars
        const volumeSeries = volumeChart.addHistogramSeries({ 
            priceFormat: { type: 'volume' }, 
            priceLineVisible: false 
        });
        volumeSeries.setData(volumeData);
        
        // Add line for volume MA
        const volAvgSeries = volumeChart.addLineSeries({ 
            color: '#ff9f0a', 
            lineWidth: 1, 
            priceLineVisible: false, 
            crosshairMarkerVisible: false 
        });
        volAvgSeries.setData(volumeMA.filter(d => d !== null));
        
        volumeChart.timeScale().fitContent();
        
        // Subscribe to volume chart crosshair
        if (volumeChart) {
            volumeChart.subscribeCrosshairMove((param) => {
                if (!param.time || !param.seriesData.size) { 
                    tooltip.style.display = 'none'; 
                    return; 
                }
                
                let idx = -1;
                if (typeof param.time === 'number') {
                    idx = currentData.findIndex(d => d.time === param.time);
                } else {
                    const timeStr = param.time;
                    idx = currentData.findIndex(d => {
                        const dDate = new Date(d.time);
                        const tDate = new Date(timeStr);
                        return dDate.toISOString().split('T')[0] === tDate.toISOString().split('T')[0];
                    });
                }
                
                const html = generateTooltipHTML(idx, null);
                
                if (html) {
                    tooltip.innerHTML = html;
                    positionTooltip(document.getElementById('volumeChart'), param.point.x, param.point.y);
                    tooltip.style.display = 'block';
                }
            });
        }
        
        // Sync time scale with main chart
        candleChart.timeScale().subscribeVisibleLogicalRangeChange((logicalRange) => {
            if (logicalRange) volumeChart.timeScale().setVisibleLogicalRange(logicalRange);
        });
    }
    
    // =========================================================================
    // RSI CHART
    // =========================================================================
    
    if (activeIndicators.rsi) {
        const rsiData = calculateRSI(currentData);
        
        rsiChart = LightweightCharts.createChart(document.getElementById('rsiChart'), {
            layout: { background: { color: chartBg }, textColor: chartText },
            grid: { vertLines: { color: chartGrid }, horzLines: { color: chartGrid } },
            rightPriceScale: { 
                borderColor: isDark ? '#38383a' : '#d2d2d7', 
                scaleMargins: { top: 0.1, bottom: 0.1 }, 
                minRange: 100, 
                width: 70 
            },
            timeScale: { borderColor: isDark ? '#38383a' : '#d2d2d7', timeVisible: true },
            height: 500,
            width: chartWidth
        });
        
        // Add RSI line
        const rsiLine = rsiChart.addLineSeries({ 
            color: '#0a84ff', 
            lineWidth: 2, 
            priceLineVisible: false, 
            title: 'RSI' 
        });
        rsiLine.setData(rsiData.filter(d => d !== null));
        
        // Lock price scale to 0-100 range
        rsiChart.priceScale().applyOptions({
            minRange: 100
        });
        
        rsiChart.timeScale().fitContent();
        
        // Subscribe to RSI chart crosshair
        if (rsiChart) {
            rsiChart.subscribeCrosshairMove((param) => {
                if (!param.time || !param.seriesData.size) { 
                    tooltip.style.display = 'none'; 
                    return; 
                }
                
                // Get RSI value directly from the chart's series data
                const rsiSeriesData = param.seriesData.get(rsiLine);
                if (!rsiSeriesData || rsiSeriesData.value === undefined) {
                    tooltip.style.display = 'none';
                    return;
                }
                
                // Find the data index for additional info
                let idx = -1;
                if (typeof param.time === 'number') {
                    idx = currentData.findIndex(d => d.time === param.time);
                } else {
                    const timeStr = param.time;
                    idx = currentData.findIndex(d => {
                        const dDate = new Date(d.time);
                        const tDate = new Date(timeStr);
                        return dDate.toISOString().split('T')[0] === tDate.toISOString().split('T')[0];
                    });
                }
                
                if (idx < 0) return;
                const data = currentData[idx];
                
                // Format date
                const date = new Date(data.time).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                });
                
                const rsiValue = rsiSeriesData.value;
                let status = 'Neutral';
                let statusClass = 'rsi-neutral';
                if (rsiValue > 70) { status = 'Overbought'; statusClass = 'rsi-overbought'; }
                else if (rsiValue < 30) { status = 'Oversold'; statusClass = 'rsi-oversold'; }
                
                // Build active indicators badge
                let activeIndicatorsList = [];
                if (activeIndicators.sma) activeIndicatorsList.push('SMA');
                if (activeIndicators.bb) activeIndicatorsList.push('BB');
                if (activeIndicators.rsi) activeIndicatorsList.push('RSI');
                if (activeIndicators.macd) activeIndicatorsList.push('MACD');
                if (activeIndicators.volume) activeIndicatorsList.push('VOL');
                
                const indicatorsBadge = activeIndicatorsList.length > 0 
                    ? `<span class="active-indicators-badge">${activeIndicatorsList.join(' • ')}</span>` 
                    : '';
                
                let html = `
                    <div class="tooltip-title-row">
                        <span class="tooltip-date">${date}</span>
                        ${indicatorsBadge}
                    </div>
                    <div class="tooltip-main-grid">
                        <div class="tooltip-section">
                            <div class="tooltip-section-title">Price</div>
                            <div class="tooltip-price-grid">
                                <div class="tooltip-price-item"><span class="tp-label">O</span><span class="tp-value">${data.open.toFixed(1)}</span></div>
                                <div class="tooltip-price-item"><span class="tp-label">H</span><span class="tp-value tp-high">${data.high.toFixed(1)}</span></div>
                                <div class="tooltip-price-item"><span class="tp-label">L</span><span class="tp-value tp-low">${data.low.toFixed(1)}</span></div>
                                <div class="tooltip-price-item"><span class="tp-label">C</span><span class="tp-value ${data.change >= 0 ? 'tp-green' : 'tp-red'}">${data.price.toFixed(1)}</span></div>
                            </div>
                        </div>
                        <div class="tooltip-section">
                            <div class="tooltip-section-title">RSI</div>
                            <div class="tooltip-rsi-display ${statusClass}" style="flex-direction: column; align-items: center; gap: 0;">
                                <span class="rsi-value" style="font-size: 1.1rem;">${rsiValue.toFixed(1)}</span>
                                <span class="rsi-status" style="font-size: 0.55rem;">${status}</span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Get SMA start dates
                const smaStartDates = {
                    day: new Date('2025-04-01'),
                    week: new Date('2023-10-29'),
                    month: new Date('2022-10-31')
                };
                const smaStartDate = smaStartDates[currentRange] || null;
                
                // Show SMA values if enabled
                if (activeIndicators.sma) {
                    const sma50 = calculateSMA(currentData, 50, smaStartDate);
                    const sma200 = calculateSMA(currentData, 200, smaStartDate);
                    if (sma50[idx] || sma200[idx]) {
                        html += `<div class="tooltip-section" style="margin-top: 6px; padding: 5px;"><div class="tooltip-section-title">SMA</div><div class="tooltip-indi-grid">`;
                        if (sma50[idx]) {
                            html += `<div class="tooltip-indi-item sma50-bg" style="padding: 2px;"><span class="ti-label">50</span><span class="ti-value">${sma50[idx].value.toFixed(1)}</span></div>`;
                        }
                        if (sma200[idx]) {
                            html += `<div class="tooltip-indi-item sma200-bg" style="padding: 2px;"><span class="ti-label">200</span><span class="ti-value">${sma200[idx].value.toFixed(1)}</span></div>`;
                        }
                        html += `</div></div>`;
                    }
                }
                
                // Show Bollinger Bands if enabled
                if (activeIndicators.bb) {
                    const bb = calculateBollingerBands(currentData);
                    if (bb && bb.upper && bb.middle && bb.lower && bb.upper[idx] && bb.middle[idx] && bb.lower[idx]) {
                        html += `<div class="tooltip-section" style="margin-top: 6px; padding: 5px;"><div class="tooltip-section-title">BB</div><div class="tooltip-indi-grid">`;
                        html += `<div class="tooltip-indi-item bb-bg" style="padding: 2px;"><span class="ti-label">U</span><span class="ti-value">${bb.upper[idx].value.toFixed(1)}</span></div>`;
                        html += `<div class="tooltip-indi-item bb-bg" style="padding: 2px;"><span class="ti-label">M</span><span class="ti-value">${bb.middle[idx].value.toFixed(1)}</span></div>`;
                        html += `<div class="tooltip-indi-item bb-bg" style="padding: 2px;"><span class="ti-label">L</span><span class="ti-value">${bb.lower[idx].value.toFixed(1)}</span></div>`;
                        html += `</div></div>`;
                    }
                }
                
                // Show MACD if enabled
                if (activeIndicators.macd) {
                    const macd = calculateMACD(currentData);
                    if (macd.macdLine[idx] && macd.macdLine[idx].value !== undefined && macd.signalLine[idx] && macd.signalLine[idx].value !== undefined) {
                        const hist = macd.histogram[idx] ? macd.histogram[idx].value : 0;
                        const histClass = hist >= 0 ? 'hist-positive' : 'hist-negative';
                        html += `<div class="tooltip-section" style="margin-top: 6px; padding: 5px;"><div class="tooltip-section-title">MACD</div><div class="tooltip-macd-grid">`;
                        html += `<div class="macd-item" style="padding: 2px;"><span class="mi-label">M</span><span class="mi-value">${macd.macdLine[idx].value.toFixed(2)}</span></div>`;
                        html += `<div class="macd-item" style="padding: 2px;"><span class="mi-label">S</span><span class="mi-value">${macd.signalLine[idx].value.toFixed(2)}</span></div>`;
                        html += `<div class="macd-item hist-item ${histClass}" style="grid-column: span 2; padding: 2px;"><span class="mi-label">Hist</span><span class="mi-value">${hist >= 0 ? '+' : ''}${hist.toFixed(2)}</span></div>`;
                        html += `</div></div>`;
                    }
                }
                
                // Show volume if enabled
                if (activeIndicators.volume) {
                    const volM = (data.vol / 1000000).toFixed(1);
                    html += `<div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--text-secondary); font-size: 0.65rem;">Vol</span>
                        <span style="font-weight: 600; color: #fff;">${volM}M</span>
                    </div>`;
                }
                
                // Show change percentage
                html += `<div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary); font-size: 0.65rem;">Change</span>
                    <span style="font-weight: 600; ${data.change >= 0 ? 'color: var(--accent-green);' : 'color: var(--accent-red);'}">${data.change >= 0 ? '▲' : '▼'} ${Math.abs(data.change).toFixed(2)}%</span>
                </div>`;
                
                tooltip.innerHTML = html;
                positionTooltip(document.getElementById('rsiChart'), param.point.x, param.point.y);
                tooltip.style.display = 'block';
            });
        }
        
        // Sync time scale with main chart
        candleChart.timeScale().subscribeVisibleLogicalRangeChange((logicalRange) => {
            if (logicalRange) rsiChart.timeScale().setVisibleLogicalRange(logicalRange);
        });
    }
    
    // =========================================================================
    // MACD CHART
    // =========================================================================
    
    if (activeIndicators.macd) {
        const macdData = calculateMACD(currentData);
        
        macdChart = LightweightCharts.createChart(document.getElementById('macdChart'), {
            layout: { background: { color: chartBg }, textColor: chartText },
            grid: { vertLines: { color: chartGrid }, horzLines: { color: chartGrid } },
            rightPriceScale: { 
                borderColor: isDark ? '#38383a' : '#d2d2d7', 
                scaleMargins: { top: 0.1, bottom: 0.1 }, 
                width: 70 
            },
            timeScale: { borderColor: isDark ? '#38383a' : '#d2d2d7', timeVisible: true },
            height: 500,
            width: chartWidth
        });
        
        // Prepare histogram data with colors
        const histogramData = macdData.histogram.filter(d => d !== null).map(d => ({ 
            time: d.time, 
            value: d.value, 
            color: d.value >= 0 ? 'rgba(48, 209, 88, 0.8)' : 'rgba(255, 69, 58, 0.8)' 
        }));
        macdChart.addHistogramSeries({ priceLineVisible: false }).setData(histogramData);
        
        // Add MACD line
        const macdLineSeries = macdChart.addLineSeries({ 
            color: '#0a84ff', 
            lineWidth: 2, 
            priceLineVisible: false, 
            title: 'MACD' 
        });
        macdLineSeries.setData(macdData.macdLine.filter(d => d !== null));
        
        // Add Signal line
        const signalLineSeries = macdChart.addLineSeries({ 
            color: '#ff9f0a', 
            lineWidth: 2, 
            priceLineVisible: false, 
            title: 'Signal' 
        });
        signalLineSeries.setData(macdData.signalLine.filter(d => d !== null));
        
        macdChart.timeScale().fitContent();
        
        // Subscribe to MACD chart crosshair
        if (macdChart) {
            macdChart.subscribeCrosshairMove((param) => {
                if (!param.time || !param.seriesData.size) { 
                    tooltip.style.display = 'none'; 
                    return; 
                }
                
                // Get MACD values directly from chart series data
                const macdLineData = param.seriesData.get(macdLineSeries);
                const signalLineData = param.seriesData.get(signalLineSeries);
                
                if (!macdLineData || !signalLineData) {
                    tooltip.style.display = 'none';
                    return;
                }
                
                // Find the data index for additional info
                let idx = -1;
                if (typeof param.time === 'number') {
                    idx = currentData.findIndex(d => d.time === param.time);
                } else {
                    const timeStr = param.time;
                    idx = currentData.findIndex(d => {
                        const dDate = new Date(d.time);
                        const tDate = new Date(timeStr);
                        return dDate.toISOString().split('T')[0] === tDate.toISOString().split('T')[0];
                    });
                }
                
                if (idx < 0) return;
                const data = currentData[idx];
                
                // Format date
                const date = new Date(data.time).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                });
                
                const macdVal = macdLineData.value;
                const signalVal = signalLineData.value;
                const histVal = macdVal - signalVal;
                const histClass = histVal >= 0 ? 'hist-positive' : 'hist-negative';
                
                // Build active indicators badge
                let activeIndicatorsList = [];
                if (activeIndicators.sma) activeIndicatorsList.push('SMA');
                if (activeIndicators.bb) activeIndicatorsList.push('BB');
                if (activeIndicators.rsi) activeIndicatorsList.push('RSI');
                if (activeIndicators.macd) activeIndicatorsList.push('MACD');
                if (activeIndicators.volume) activeIndicatorsList.push('VOL');
                
                const indicatorsBadge = activeIndicatorsList.length > 0 
                    ? `<span class="active-indicators-badge">${activeIndicatorsList.join(' • ')}</span>` 
                    : '';
                
                let html = `
                    <div class="tooltip-title-row">
                        <span class="tooltip-date">📅 ${date}</span>
                        ${indicatorsBadge}
                    </div>
                    <div class="tooltip-main-grid">
                        <div class="tooltip-section">
                            <div class="tooltip-section-title">💰 Price</div>
                            <div class="tooltip-price-grid">
                                <div class="tooltip-price-item"><span class="tp-label">O</span><span class="tp-value">₹${data.open.toFixed(2)}</span></div>
                                <div class="tooltip-price-item"><span class="tp-label">H</span><span class="tp-value tp-high">₹${data.high.toFixed(2)}</span></div>
                                <div class="tooltip-price-item"><span class="tp-label">L</span><span class="tp-value tp-low">₹${data.low.toFixed(2)}</span></div>
                                <div class="tooltip-price-item"><span class="tp-label">C</span><span class="tp-value ${data.change >= 0 ? 'tp-green' : 'tp-red'}">₹${data.price.toFixed(2)}</span></div>
                            </div>
                        </div>
                        <div class="tooltip-section">
                            <div class="tooltip-section-title">📊 MACD</div>
                            <div class="tooltip-macd-grid" style="font-size: 0.65rem;">
                                <div class="macd-item" style="padding: 2px 4px;"><span class="mi-label">M</span><span class="mi-value">${macdVal.toFixed(2)}</span></div>
                                <div class="macd-item" style="padding: 2px 4px;"><span class="mi-label">S</span><span class="mi-value">${signalVal.toFixed(2)}</span></div>
                                <div class="macd-item hist-item ${histClass}" style="grid-column: span 2; padding: 2px 4px;"><span class="mi-label">Hist</span><span class="mi-value">${histVal >= 0 ? '+' : ''}${histVal.toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Get SMA start dates
                const smaStartDates = {
                    day: new Date('2025-04-01'),
                    week: new Date('2023-10-29'),
                    month: new Date('2022-10-31')
                };
                const smaStartDate = smaStartDates[currentRange] || null;
                
                // Show SMA values if enabled
                if (activeIndicators.sma) {
                    const sma50 = calculateSMA(currentData, 50, smaStartDate);
                    const sma200 = calculateSMA(currentData, 200, smaStartDate);
                    if (sma50[idx] || sma200[idx]) {
                        html += `<div class="tooltip-section" style="margin-top: 6px; padding: 5px;"><div class="tooltip-section-title">SMA</div><div class="tooltip-indi-grid">`;
                        if (sma50[idx]) {
                            html += `<div class="tooltip-indi-item sma50-bg" style="padding: 2px;"><span class="ti-label">50</span><span class="ti-value">${sma50[idx].value.toFixed(1)}</span></div>`;
                        }
                        if (sma200[idx]) {
                            html += `<div class="tooltip-indi-item sma200-bg" style="padding: 2px;"><span class="ti-label">200</span><span class="ti-value">${sma200[idx].value.toFixed(1)}</span></div>`;
                        }
                        html += `</div></div>`;
                    }
                }
                
                // Show Bollinger Bands if enabled
                if (activeIndicators.bb) {
                    const bb = calculateBollingerBands(currentData);
                    if (bb && bb.upper && bb.middle && bb.lower && bb.upper[idx] && bb.middle[idx] && bb.lower[idx]) {
                        html += `<div class="tooltip-section" style="margin-top: 6px; padding: 5px;"><div class="tooltip-section-title">BB</div><div class="tooltip-indi-grid">`;
                        html += `<div class="tooltip-indi-item bb-bg" style="padding: 2px;"><span class="ti-label">U</span><span class="ti-value">${bb.upper[idx].value.toFixed(1)}</span></div>`;
                        html += `<div class="tooltip-indi-item bb-bg" style="padding: 2px;"><span class="ti-label">M</span><span class="ti-value">${bb.middle[idx].value.toFixed(1)}</span></div>`;
                        html += `<div class="tooltip-indi-item bb-bg" style="padding: 2px;"><span class="ti-label">L</span><span class="ti-value">${bb.lower[idx].value.toFixed(1)}</span></div>`;
                        html += `</div></div>`;
                    }
                }
                
                // Show RSI if enabled
                if (activeIndicators.rsi) {
                    const rsi = calculateRSI(currentData);
                    const rsiIdx = idx - 1;
                    if (rsiIdx >= 0 && rsi[rsiIdx]) {
                        const rsiVal = rsi[rsiIdx].value;
                        let rsiStatus = 'Neutral';
                        let rsiClass = 'rsi-neutral';
                        if (rsiVal > 70) { rsiStatus = 'Overbought'; rsiClass = 'rsi-overbought'; }
                        else if (rsiVal < 30) { rsiStatus = 'Oversold'; rsiClass = 'rsi-oversold'; }
                        html += `<div class="tooltip-section" style="margin-top: 6px; padding: 5px;"><div class="tooltip-section-title">RSI</div>`;
                        html += `<div class="tooltip-rsi-display ${rsiClass}" style="flex-direction: column; align-items: center; gap: 0; padding: 4px;">
                            <span class="rsi-value" style="font-size: 1.1rem;">${rsiVal.toFixed(1)}</span>
                            <span class="rsi-status" style="font-size: 0.55rem;">${rsiStatus}</span>
                        </div></div>`;
                    }
                }
                
                // Show volume if enabled
                if (activeIndicators.volume) {
                    const volM = (data.vol / 1000000).toFixed(1);
                    html += `<div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--text-secondary); font-size: 0.65rem;">Vol</span>
                        <span style="font-weight: 600; color: #fff;">${volM}M</span>
                    </div>`;
                }
                
                // Show change percentage
                html += `<div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary); font-size: 0.65rem;">Change</span>
                    <span style="font-weight: 600; ${data.change >= 0 ? 'color: var(--accent-green);' : 'color: var(--accent-red);'}">${data.change >= 0 ? '▲' : '▼'} ${Math.abs(data.change).toFixed(2)}%</span>
                </div>`;
                
                tooltip.innerHTML = html;
                positionTooltip(document.getElementById('macdChart'), param.point.x, param.point.y);
                tooltip.style.display = 'block';
            });
        }
        
        // Sync time scale with main chart
        candleChart.timeScale().subscribeVisibleLogicalRangeChange((logicalRange) => {
            if (logicalRange) macdChart.timeScale().setVisibleLogicalRange(logicalRange);
        });
    }
    
    // =========================================================================
    // LINE CHART (alternative view)
    // =========================================================================
    
    lineChart = LightweightCharts.createChart(document.getElementById('lineChart'), {
        layout: { background: { color: chartBg }, textColor: chartText },
        grid: { vertLines: { color: chartGrid }, horzLines: { color: chartGrid } },
        crosshair: { 
            mode: LightweightCharts.CrosshairMode.Normal, 
            vertLine: { color: '#0a84ff', width: 1, style: 2 }, 
            horzLine: { color: '#0a84ff', width: 1, style: 2 } 
        },
        rightPriceScale: { 
            borderColor: isDark ? '#38383a' : '#d2d2d7', 
            scaleMargins: { top: 0.1, bottom: 0.1 }, 
            width: 70 
        },
        timeScale: { 
            borderColor: isDark ? '#38383a' : '#d2d2d7', 
            timeVisible: true, 
            tickMarkFormatter: (time) => {
                const date = new Date(time);
                return date.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: '2-digit' 
                });
            } 
        },
        width: chartWidth
    });
    
    // Add area series (filled line chart)
    lineChart.addAreaSeries({ 
        lineColor: '#0a84ff', 
        topColor: 'rgba(10, 132, 255, 0.4)', 
        bottomColor: 'rgba(10, 132, 255, 0.0)', 
        lineWidth: 2 
    }).setData(lineData);
    lineChart.timeScale().fitContent();
    
    // Update indicator legend
    updateIndicatorLegend();
}


/* -----------------------------------------------------------------------------
   12. WINDOW RESIZE HANDLER
   ---------------------------------------------------------------------------- */

/**
 * Window resize event handler
 * 
 * Responsive resize of all charts when browser window size changes.
 * Adjusts heights based on number of visible indicator panels.
 */
window.addEventListener('resize', () => {
    // Get new width from main chart container
    const newChartWidth = document.getElementById('candleChart').clientWidth;
    
    // Calculate new height based on visible indicators
    const activeCount = (activeIndicators.rsi ? 1 : 0) + 
                       (activeIndicators.macd ? 1 : 0) + 
                       (activeIndicators.volume ? 1 : 0);
    const newChartHeight = activeCount > 0 ? Math.max(300, 380 - activeCount * 60) : 500;
    
    // Resize all charts
    if (candleChart) candleChart.resize(newChartWidth, newChartHeight);
    if (lineChart) lineChart.resize(newChartWidth, newChartHeight);
    if (volumeChart) volumeChart.resize(newChartWidth, 140);
    if (rsiChart) rsiChart.resize(newChartWidth, 180);
    if (macdChart) macdChart.resize(newChartWidth, 180);
});


/* -----------------------------------------------------------------------------
   13. INDICATOR LEGEND UPDATE
   ---------------------------------------------------------------------------- */

/**
 * updateIndicatorLegend - Updates the indicator legend display
 * 
 * Shows colored indicators for each active technical indicator
 * to help users understand what each line represents.
 */
function updateIndicatorLegend() {
    const legend = document.getElementById('indicatorLegend');
    if (!legend) return;
    
    let html = '';
    
    // Add legend items for each active indicator
    if (activeIndicators.sma) {
        html += '<span class="legend-item"><span class="legend-color" style="background: #30d158;"></span>SMA 50</span>';
        html += '<span class="legend-item"><span class="legend-color" style="background: #ff9f0a;"></span>SMA 200</span>';
    }
    if (activeIndicators.bb) {
        html += '<span class="legend-item"><span class="legend-color" style="background: #bf5af2;"></span>Bollinger Bands</span>';
    }
    if (activeIndicators.rsi) {
        html += '<span class="legend-item"><span class="legend-color" style="background: #0a84ff;"></span>RSI (14)</span>';
        html += '<span class="legend-item"><span class="legend-color" style="background: #ff453a; opacity: 0.3;"></span>Overbought (70)</span>';
        html += '<span class="legend-item"><span class="legend-color" style="background: #30d158; opacity: 0.3;"></span>Oversold (30)</span>';
    }
    if (activeIndicators.macd) {
        html += '<span class="legend-item"><span class="legend-color" style="background: #0a84ff;"></span>MACD</span>';
        html += '<span class="legend-item"><span class="legend-color" style="background: #ff9f0a;"></span>Signal</span>';
    }
    if (activeIndicators.volume) {
        html += '<span class="legend-item"><span class="legend-color" style="background: #30d158;"></span>Vol</span>';
        html += '<span class="legend-item"><span class="legend-color" style="background: #ff9f0a;"></span>Vol MA</span>';
    }
    
    legend.innerHTML = html;
}


/* -----------------------------------------------------------------------------
   14. INITIALIZATION ON PAGE LOAD
   ---------------------------------------------------------------------------- */

/**
 * Initialize the application
 * 
 * This runs when the script loads, setting up the dashboard
 * with all data and charts.
 */
loadAllData();
