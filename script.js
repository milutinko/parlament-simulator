document.addEventListener('DOMContentLoaded', function () {
    // Initial data
    const initialData = [
        { name: 'Aleksandar Vučić - Srbija ne sme da stane', y: 42, color: '#001F3F', label: 'SNS' },
        { name: 'Ivica Dačić - premijer Srbije', y: 17, color: '#FF0000', label: 'SPS' },
        { name: 'ПЕ', y: 29, color: '#2196F3', label: 'Лидер 3' },
        { name: 'Dr Miloš Jovanović - Nada za Srbiju', y: 37, color: '#8E44AD', label: 'NADA' },
        { name: 'ДС', y: 6, color: '#FF5722', label: 'Лидер 5' },
        { name: 'ЈС', y: 17, color: '#673AB7', label: 'Лидер 6' },
        { name: 'Народна', y: 27, color: '#009688', label: 'Лидер 7' },
        { name: 'НПС—ЕУ—НЛС', y: 10, color: '#FF9800', label: 'Лидер 8' },
        { name: 'Milica Đurđević Stamenkovski - Boško Obradović - Nacionalno okupljanje - Državotvorna snaga', y: 16, color: '#000000', label: 'Dveri/Zavetnici' },
        { name: 'СДП', y: 23, color: '#9C27B0', label: 'Лидер 10' },
        { name: 'ПУПС', y: 12, color: '#607D8B', label: 'Лидер 11' },
        { name: 'Двери', y: 20, color: '#FFEB3B', label: 'Лидер 12' },
        { name: 'СПП—ДСХВ—УСС', y: 23, color: '#8BC34A', label: 'Лидер 13' },
        { name: 'Заједно', y: 8, color: '#03A9F4', label: 'Лидер 14' },
        { name: 'СВМ', y: 26, color: '#FF5252', label: 'Лидер 15' },
        { name: 'ЗЛФ', y: 4, color: '#CDDC39', label: 'Лидер 16' },
    ];

    // Create the chart
    const chart = Highcharts.chart('container', {
        chart: {
            type: 'item',
            height: '1000px',
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
            startAngle: -100,
            endAngle: 100
        }],
    });

    // Create sliders dynamically for each data point
    initialData.forEach((item, index) => {
        createSlider(item, index);
    });

    // Function to create sliders
    function createSlider(item, index) {
        const container = document.createElement('div');
        container.innerHTML = `
            <label for="slider${index}">${item.name} (${item.label}): </label>
            <input type="range" id="slider${index}" min="0" max="100" step="1" value="${item.y}">
            <span id="sliderValue${index}">${item.y}</span>
        `;
        document.body.appendChild(container);

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