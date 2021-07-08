Chart.defaults.global.defaultFontColor = 'white';
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Temperature',
            data: [0],
            backgroundColor: 'rgba(255,99,71,1)',
            borderColor: 'rgba(255,99,71,1)',
            borderWidth: 1,
            fill: false,
            },

        ]
    },
    options: {
         legend: {
            display: true,
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
         },
        scales: {
             xAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgb(211,211,211, 0.16)'
                  }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return value+'°';
                    }
                },
                // type: 'logarithmic',
                gridLines: {
                    display: true,
                    color: 'rgb(211,211,211, 0.16)'
                  }
            }]
        },
        title: {
            fontSize: 20,
            text: "Room Temperature Graph",
            display: true,
            fontStyle: 'bold',
            fontColor: 'white'
        },
    }
});

var ct1 = document.getElementById('myChart1').getContext('2d');
var myChart1 = new Chart(ct1, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [
            {label: 'Humidity',
            data: [0],
            backgroundColor: 'rgba(40, 116, 166, 1)',
            borderColor: 'rgba(40, 116, 166, 1)',
            fill: false,
            borderWidth: 1},
        ]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgb(211,211,211, 0.16)'
                  }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return value+'%';
                    }
                },
                // type: 'logarithmic',
                gridLines: {
                    display: true,
                    color: 'rgb(211,211,211, 0.16)'
                  }
            }]
        },
        title: {
            fontSize: 20,
            text: "Room Humidity Graph",
            display: true,
            fontStyle: 'bold',
            fontColor: 'white'
        },
    }
});

var ct2 = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ct2, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Heat Index',
            data: [0],
            backgroundColor: 'rgba(35, 155, 86, 1)',
            borderColor: 'rgba(35, 155, 86, 1)',
            fill: false,
            borderWidth: 1
            },

        ]
    },
    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgb(211,211,211, 0.16)'
                  }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return value+'°';
                    }
                },
                // type: 'logarithmic',
                gridLines: {
                    display: true,
                    color: 'rgb(211,211,211, 0.16)'
                  }
            }]
        },
        title: {
            fontSize: 20,
            text: "Heat Index Graph",
            display: true,
            fontStyle: 'bold',
            fontColor: 'white'
        },
    }
});

dataPie = {
    datasets: [{
        data: [90, 10],
        backgroundColor: [
            'rgba(0, 255, 0, 0.8)',
            'rgba(255, 0, 0, 0.8)',
        ],
        borderColor: [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
        ],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Accuracy',
        'Loss',
    ]
};


const allCharts = [myChart, myChart1, myChart2]

function get_elem(myId){
	return document.querySelector(myId);
}

var stats = {'data_stat': {'temperature': {'count': {'data': get_elem('#temp-count-data'), 'arrow': get_elem('#temp-count-arrow')},
							'mean': {'data': get_elem('#temp-mean-data'), 'arrow': get_elem('#temp-mean-arrow')},
							'std': {'data': get_elem('#temp-std-data'), 'arrow': get_elem('#temp-std-arrow')},
							'min': {'data': get_elem('#temp-min-data'), 'arrow': get_elem('#temp-min-arrow')},
							'max': {'data': get_elem('#temp-max-data'), 'arrow': get_elem('#temp-max-arrow')}
							},
						'humidity': {'count': {'data': get_elem('#hum-count-data'), 'arrow': get_elem('#hum-count-arrow')},
							'mean': {'data': get_elem('#hum-mean-data'), 'arrow': get_elem('#hum-mean-arrow')},
							'std': {'data': get_elem('#hum-std-data'), 'arrow': get_elem('#hum-std-arrow')},
							'min': {'data': get_elem('#hum-min-data'), 'arrow': get_elem('#hum-min-arrow')},
							'max': {'data': get_elem('#hum-max-data'), 'arrow': get_elem('#hum-max-arrow')}
							},
						'heat_index': {'count': {'data': get_elem('#heat-count-data'), 'arrow': get_elem('#heat-count-arrow')},
							'mean': {'data': get_elem('#heat-mean-data'), 'arrow': get_elem('#heat-mean-arrow')},
							'std': {'data': get_elem('#heat-std-data'), 'arrow': get_elem('#heat-std-arrow')},
							'min': {'data': get_elem('#heat-min-data'), 'arrow': get_elem('#heat-min-arrow')},
							'max': {'data': get_elem('#heat-max-data'), 'arrow': get_elem('#heat-max-arrow')}, }
							},
			}

function displayDataStats(data_stats){
    Object.keys(stats['data_stat']).forEach(key => {
        // console.log(key, stats['data_stat'][key]);
        Object.keys(stats['data_stat'][key]).forEach(stat_key => {
            stats['data_stat'][key][stat_key].data.innerHTML = data_stats[key][stat_key].data;
            stats['data_stat'][key][stat_key].arrow.innerHTML = `<img style="height: 15px;" src='/static/${data_stats[key][stat_key].arrow}.png'> ${data_stats[key][stat_key]['%']}%`;
        });

    });
}

function displayPredStats(pred_stats){
    Object.keys(stats['pred_stat']).forEach(key => {
        Object.keys(stats['pred_stat'][key]).forEach(stat_key => {
            stats['pred_stat'][key][stat_key].rmse.innerHTML = `<img style="height: 15px;" src='/static/${pred_stats[key][stat_key].arrow}.png'> ${pred_stats[key][stat_key]['rmse']}`;
            stats['pred_stat'][key][stat_key].date.innerHTML = pred_stats[key][stat_key].date;
        });
    });

}
const max_length = 50;
const start = new Date("Sep 10, 2020 12:00:00").getTime();
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if(check){
      let mainBox = document.querySelector(".main");
      mainBox.style.height = "800px";
  }
  return check;
};

function today(){
    let date = new Date();
    document.getElementById("today").innerHTML = `${String(date).split(String(date.getFullYear()))[0].trim()}, ${date.getFullYear()}`;
}

today()

function next_x(chat, item){
    chat.data.labels.push(item);
    if (chat.data.labels.length > max_length){
        chat.data.labels.shift();
    }

}

function next_y(chat, item){
    for (let i=0; i<item.length; i++ ){
        chat.data.datasets[i].data.push(item[i]);
    if (chat.data.datasets[i].data.length > max_length){
        chat.data.datasets[i].data.shift();
    }

    }

}

function timeCount(){
    var now = new Date().getTime();
    var myCount =  now - start;
    var days = Math.floor(myCount / (1000 * 60 * 60 * 24));
    var hours = Math.floor((myCount  % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((myCount  % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((myCount  % (1000 * 60)) / 1000);

    document.getElementById("time").innerHTML = "<span style='color:pink;'>RUNTIME</span><br><span>" + days + "d " + hours + "h "
  + minutes + "m " + seconds + "s </span>";
}


async function myData(){
    const response = await fetch('/get-data');
    const data = await response.json();
    let myTime = data['datetime'].split(" ")[1];
    let temp_data = [data['actual']['sensor']['temperature']];
    let hum_data = [data['actual']['sensor']['humidity']];
    let heat_data = [data['actual']['sensor']['heat_index']];
    let data_list = [temp_data, hum_data, heat_data];
    let chart_list = [myChart, myChart1, myChart2];

    // let pie_list = [PieTemp, PieHum, PieHeat];
    // let p_data = data['pred_stat']['lstm'];
    // let pie_data = [[p_data['temp']['accuracy'], p_data['temp']['loss']],
    //                 [p_data['hum']['accuracy'], p_data['hum']['loss']],
    //                 [p_data['heat']['accuracy'], p_data['heat']['loss']]];
    for(let i=0; i<chart_list.length;i++){
        next_x(chart_list[i], myTime);
        next_y(chart_list[i], data_list[i]);
        // pie_list[i].data.datasets[0].data = pie_data[i];
    }

    displayDataStats(data['data_stat']);
    // displayPredStats(data['pred_stat']);


}

function update(){
    myData();
    for(let i=0; i<allCharts.length; i++){
        allCharts[i].update();
    }
    // timeCount();
}

setInterval(update, 1000);


