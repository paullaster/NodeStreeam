const delay = (second, cb) =>{
    setTimeout(cb, second*1000);
}
console.log('start running function');
delay(2, () =>{
    console.log('delay for two seconds');
    delay(1, () =>{
        console.log('delay for three seconds');
        delay(1, () =>{
            console.log('delay for four seconds');
            delay(1, () =>{
                console.log('delay for five seconds');
                delay(1, () =>{
                    console.log('delay for six seconds');
                    delay(1, () => {
                        console.log('delay for seven seconds');
                        delay(1, () => {
                            console.log('delay for eight seconds');
                            delay(1, () => {
                                console.log('delay for nine seconds');
                                delay(1, () => {
                                    console.log('delay for ten seconds');

                                });
                            });
                        });
                    });
                });
            });
        });
    });
});