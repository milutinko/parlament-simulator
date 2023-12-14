document.addEventListener('DOMContentLoaded', function () {
    // Initial data
    const initialData = [
        { name: 'Aleksandar Vučić', y: 30, color: '#4CAF50', label: 'SNS' },
        { name: 'Ivica Dačić', y: 20, color: '#FFC107', label: 'SPS' },
        { name: 'Dr Vojislav Šešelj', y: 25, color: '#2196F3', label: 'SRS' },
        { name: 'Milica Đurđević Stamenkovski', y: 15, color: '#E91E63', label: 'Dveri' },
        { name: 'Dr Miloš Jovanović', y: 30, color: '#FF5722', label: 'NADA' },
        { name: 'VAJDASÁGI MAGYAR SZÖVETSÉG', y: 10, color: '#9C27B0', label: 'VMSZ' },
        { name: 'Srbija protiv nasilja', y: 20, color: '#607D8B', label: 'SPN' },
        { name: 'Usame Zukorlić', y: 5, color: '#FF9800', label: 'UzP' },
        { name: 'SDA SANDžAKA', y: 15, color: '#795548', label: 'SDA' },
        { name: 'Zajedno za budućnost i razvoj', y: 10, color: '#FFEB3B', label: 'ZZBiR' },
        { name: 'Narodna stranka', y: 10, color: '#9E9E9E', label: 'NS' },
        { name: 'Saša Radulović - Boris Tadić', y: 15, color: '#673AB7', label: 'DJB-SDS' },
        { name: 'Politička borba Albanaca', y: 5, color: '#8BC34A', label: 'PBA' },
        { name: 'Mi - glas naroda', y: 5, color: '#3F51B5', label: 'MG' },
        { name: 'Srbija na zapadu', y: 10, color: '#FF5252', label: 'SNZ' },
        { name: 'Ruska stranka', y: 5, color: '#00BCD4', label: 'RS' },
        { name: 'Čedomir Jovanović', y: 5, color: '#FF1744', label: 'CJ' },
        { name: 'Albanska demokratska alternativa', y: 5, color: '#009688', label: 'ADA' },
    ];

    const slidersContainer = document.createElement('div');
    document.body.appendChild(slidersContainer);    

    // Create the chart
    const chart = Highcharts.chart('container', {
        chart: {
            type: 'item',
            height: '1000px',
        },
        
        title: {
            text: 'Parlamentarni izbori',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
            },
        },

        series: [{
            name: 'Representatives',
            keys: ['name', 'y', 'color', 'label'],
            data: initialData.map(item => [item.name, item.y, item.color, item.label]),
            dataLabels: {
                enabled: true,
                format: '{point.label}',
                style: {
                    textOutline: '3px contrast'
                }
            },
            center: ['50%', '50%'],
            size: '80%',
            startAngle: -90,
            endAngle: 90
        }],
    });

    // Create sliders dynamically for each data point
    initialData.forEach((item, index) => {
        createSlider(item, index);
    });

    // Function to create sliders
    function createSlider(item, index) {
        // Create a container for each slider
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container'; // You can add a class for styling if needed
        sliderContainer.innerHTML = `
            <label for="slider${index}">${item.name} (${item.label}): </label>
            <input type="range" id="slider${index}" min="0" max="100" step="1" value="${item.y}">
            <span id="sliderValue${index}">${item.y}</span>
        `;
        slidersContainer.appendChild(sliderContainer);
        const slider = document.getElementById(`slider${index}`);
        const sliderValue = document.getElementById(`sliderValue${index}`);

        slider.addEventListener('input', function () {
            const newValue = parseInt(slider.value);
            sliderValue.innerText = newValue;

            // Update chart data
            const newData = [...chart.series[0].options.data];
            newData[index] = [item.name, newValue, item.color, item.label];
            chart.series[0].setData(newData);
        });
    }
});