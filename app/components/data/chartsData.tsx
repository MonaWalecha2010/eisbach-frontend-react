export const TotalLlmRoutes={
    data:{
        labels: ['doc_embeddings', 'enterprise_users', 'salesbot', 'myusers', 'eng_dept' ],   
        datasets: [{             
            data: [92, 76, 60, 25, 5],
            label: 'Routes',
            borderColor: '#7262F6',
            backgroundColor: '#ffffff',
            lineTension: 0.2,        
        }],
    },
    options: {
        indexAxis: 'y',
        pointStyle: false,        
        scales: {            
            x: {
                beginAtZero: true,
                max: 100,
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Qeries',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
            y: {
                border:{display: false},
                title:{
                    display: true,
                    text: 'Routes',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            }
        }
    },
}
export const TopFiveRoutes={
    data:{
        labels: ['doc embeddings', 'enterprise users', 'salesbot', 'myusers', 'eng_dept'],
        datasets: [
            {
                label: 'Routes',
                data: [60, 50, 65,23, 80],
                backgroundColor: ['#5945FF', '#9B9B9B', '#D9D9D9', '#FF1612', '#000000'],
                barPercentage: .5,
            },   
        ],
    }, 
    options:{
        scales: {
            x: {
                title:{
                    display: true,
                    text: 'Routes',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },               
                grid: {
                    display: false,
                }
            },
            y: {                 
                title:{
                    display: true,
                    text: 'Errors',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },                              
                grid: {
                    display: false
                }
            },
        }
    },   
};
export const UnownRouteErrors={
    data:{
        labels: ['doc embeddings (50%)', 'enterprise users (15%)', 'salesbot (20%)', 'myusers (15%)'],
        datasets: [{
            label: 'Unknown Route Errors',
            data: [15, 55, 15, 15],
            backgroundColor: [                   
                '#5945ff',
                '#e2e2e2',
                '#4e4e4e',
                '#000000',
                '#4e4e4e'               
            ],      
            borderWidth: .2,
        }],
    }
};
export const QueryLatency={
    data:{
        labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],   
        datasets: [
            {             
                data: [11, 10, 12, 17, 16, 19, 18, 20, 24],
                label: 'errors',
                borderColor: '#7262F6',
                backgroundColor: '#ffffff',
                lineTension: 0.3,
                        
            },
            {             
                data: [9, 12, 15, 22, 23, 13, 18, 16, 20],
                label: 'errors',
                borderColor: '#333333',
                backgroundColor: '#ffffff',
                lineTension: 0.3,        
            }
        ],
    },
    options:{
        radius: 0,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Errors',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Upto 24 hrs',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
        }
    },
}
export const QueryRetries={
    data:{
        labels: ['doc embeddings', 'enterprise users', 'salesbot', 'myusers', 'eng_dept'],
        datasets: [
            {
                label: 'Routes',
                data: [60, 50, 65,23, 80],
                backgroundColor: ['#5945FF', '#9B9B9B', '#D9D9D9', '#FF1612', '#000000'],
                barPercentage: .5,
            },   
        ],
    },
    options:{
        radius: 0,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Routes',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
            y: {
                stacked: true,
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Errors',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
        }
    }
}
export const CostsData={
    data:{
        labels: ['Jan', 'Feb', 'Mar', 'Arp', 'May', 'June','July', 'Aug', 'sept'],   
        datasets: [{             
            data: [430, 290, 350, 450, 300, 390, 400, 500, 550],
            label: 'Routes',
            borderColor: '#D9D9D9',
            backgroundColor: ['red', 'green', 'red', 'black','blue'],
            lineTension: 0.3,        
        }],
    },
    options:{
        radius: 4,               
        scales: { 
            x: {
                offset: true, 
                title:{
                    display: true,
                    text: 'Months 2023',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" 
                },
                grid: {
                    display: false
                }
            },
            y: {
                border:{
                    display: false
                },                                                          
                title:{
                    display: true,
                    text: 'Costs',
                    align: 'center', 
                    font: {
                        size: 14,
                        weight: 600,                        
                    }, 
                    color: "#000"                 
                },                
            }
        }
    },    
}
export const MostUsedProviders={
    data:{
        labels: ['providr 1 (62%)', 'providr 2 (12%)', 'providr 3 (12%)', 'providr 4 (12%)', 'providr 5 (12%)',  'providr 5 (10%)'],
        datasets: [{
            label: 'Unknown Route Errors',
            data: [64, 10, 12, 12, 12, 10],
            backgroundColor: [
                '#e2e2e2',                   
                '#5945ff',
                'green',
                'red',
                '#4e4e4e',
                '#000000',
            ],      
            borderWidth: .2,
        }],
    }
};
export const TotalLlmProviders={
    data:{
        labels: ['doc_embeddings', 'enterprise_users', 'salesbot', 'myusers', 'eng_dept' ],   
        datasets: [{             
            data: [92, 76, 60, 25, 5],
            label: 'Providers',
            borderColor: '#7262F6',
            backgroundColor: '#ffffff',
            lineTension: 0.2,        
        }],
    },
    options: {
        indexAxis: 'y',
        pointStyle: false,
        scales: {            
            x: {
                beginAtZero: true,
                max: 100,
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Qeries',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
            y: {
                border:{display: false},
                title:{
                    display: true,
                    text: 'Providers',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            }
        }
    },
}
export const UnownProviders={
    data:{
        labels: ['providr 1 (62%)', 'providr 2 (12%)', 'providr 3 (12%)', 'providr 5 (12%)'],
        datasets: [{
            label: 'Unknown Route Errors',
            data: [55, 15, 15, 15],
            backgroundColor: [
                '#e2e2e2',                   
                '#5945ff',
                '#4e4e4e',
                '#000000',
            ],      
            borderWidth: .2,
        }],
    }
};
export const UsedModelProviders={
    data:{
        labels: ['providr 1 (62%)', 'providr 2 (12%)', 'providr 3 (12%)', 'providr 5 (12%)'],
        datasets: [{
            label: 'Unknown Route Errors',
            data: [55, 15, 15, 15],
            backgroundColor: [
                '#e2e2e2', 
                'red',                  
                '#5945ff',
                'blue'            
            ],      
            borderWidth: .2,
        }],
    }
};
export const PotentialLatency={
    data:{
        labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],   
        datasets: [
            {             
                data: [11, 10, 12, 17, 16, 19, 18, 20, 24],
                label: 'errors',
                borderColor: '#7262F6',
                backgroundColor: '#ffffff',
                lineTension: 0.3,
                        
            },
            {             
                data: [15, 17, 19, 22, 23, 13, 18, 16, 20],
                label: 'errors',
                borderColor: '#333333',
                backgroundColor: '#ffffff',
                lineTension: 0.3,        
            }
        ],
    },
    options:{
        radius: 0,
        scales: {
            x: {               
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Model',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
            y: {               
                grid: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Percentages',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 600,                        
                    },
                    color: "#000" ,                    
                },
            },
        }
    },
}
