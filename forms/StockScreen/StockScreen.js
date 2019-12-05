
jmbValue.onclick=function(){
  GridRow3.show()
  GridRow4.show()
  jmbValue.value =""
  jmbValue.buttonValue=""
  
}

StockScreen.onshow=function(){
    let myurl2 = "https://cors-anywhere.herokuapp.com/https://cloud.iexapis.com/stable/stock/"+iptTicker.value+"/company?token="+apiKey;
    let myurl = "https://cors-anywhere.herokuapp.com/https://cloud.iexapis.com/stable/stock/"+iptTicker.value+"/earnings/1/actualEPS?token="+apiKey;
    let myurl1 = "https://cors-anywhere.herokuapp.com/https://cloud.iexapis.com/stable/stock/"+iptTicker.value+"/quote?token="+apiKey;
   
   $.ajax({
            url: myurl1,
            method: 'GET',
            dataType: 'json',
            success: function(data){   // this function runs with the returned data if trip is successful

            console.log(data)
            jmbValue.header = data.companyName
            lblPrice.value = "$" + data.latestPrice
            let percentChange = data.changePercent*100
            let percent = Math.round(percentChange*100)/100
            alertPrice.value = (percent)+"%"
            
            // Not working yet
            if (percent >0) {
              $("#alertPrice").removeClass("alert-success")
              $("#alertPrice").addClass("alert-success")
              $("#GridRow3").addClass("text-success")
              $("#crdMarketCap").addClass("border-success")
              $("#crdPe").addClass("border-success")
              $("#crdEPS").addClass("border-success")
              $("#GridRow4").addClass("text-success")
              $("#crd52wh").addClass("border-success")
              $("#crd52wl").addClass("border-success")
              $("#crdYTDchange").addClass("border-success")
            } else if (percent <0) {
              $("#alertPrice").removeClass("alert-success")
              $("#alertPrice").addClass("alert-danger")
              $("#GridRow3").addClass("text-danger")
              $("#crdMarketCap").addClass("border-danger")
              $("#crdPe").addClass("border-danger")
              $("#crdEPS").addClass("border-danger")
              $("#GridRow4").addClass("text-danger")
              $("#crd52wh").addClass("border-danger")
              $("#crd52wl").addClass("border-danger")
              $("#crdYTDchange").addClass("border-danger")
            }
            let marketCap = data.marketCap/1000000000
            crdMarketCap_title.innerHTML= marketCap.toFixed(3) +" B"
            let priceEarnings = data.peRatio
            crdPe_title.innerHTML=priceEarnings +"x"
            let week52high = data.week52High
            crd52wh_title.innerHTML=week52high
            let week52low = data.week52Low
            crd52wl_title.innerHTML=week52low
            let YTDchange = Math.round(data.ytdChange*100)/100
            crdYTDchange_title.innerHTML= YTDchange +"%"
           
            
            
            
            }
            //GET /stock/{symbol}/quote
         });
      $.ajax({
            url: myurl,
            method: 'GET',
            dataType: 'json',
            success: function(data){   // this function runs with the returned data if trip is successful
            
            let EPS = data
            crdEPS_title.innerHTML=EPS
            console.log(data)
            
            }   
         
         
         // /stock/aapl/earnings/1/actualEPS
          });
      $.ajax({
            url: myurl2,
            method: 'GET',
            dataType: 'json',
            success: function(data){   // this function runs with the returned data if trip is successful
            
            jmbValue.value = data.description
            
            }   
         
         
         // /stock/aapl/earnings/1/actualEPS
          });    
}