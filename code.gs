//ラウンジAPIから名前の変更履歴を探す
function searchNamehistory(){
  const lounge_name = getCellName('Sheet1', 2, 3)
  
  //A,JSONデータの取得と読み込み
  const requestUrl = `https://www.mk8dx-lounge.com/api/player/details?name=`+lounge_name; //リクエスト先(zipcloud)
  const response = UrlFetchApp.fetch(requestUrl).getContentText();//フェッチ通信
  const json = JSON.parse(response);//JSON読み込み

  //B,JSONデータから出力
  if (json.status != 404) {
    const namehistory = json.nameHistory;

    let j = 0;
    let k = 0;

    //time
    for(i=namehistory.length-1; 0<=i; i--){
      let str = namehistory[i].changedOn;
      let date = str.substring(0, str.indexOf('T'));
      let time = str.substring(str.indexOf('T')+1, str.indexOf('T')+8);
      let all = date.replace( /-/g, '/' ) + " " + time;

      if(i == 0){
        setCellValue('Sheet1', 5, 3, all)
      }

      setCellValue('Sheet1', 10+j, 2, all); // シート名 行 列 値
      j++;
    }

    //Name
    for(i=namehistory.length-1; 0<=i; i--){
      setCellValue('Sheet1', 10+k, 3, namehistory[i].name); // シート名 行 列 値
      k++;
    }

    //Logger.log(namehistory.length);

  }else{
    Logger.log("Error!");
    setCellValue('Sheet1', 10+j, 2, "Error!"); // シート名 行 列 値
  }

}

//GASによって入力された内容を削除する
function allclear(){
  try{
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(5, 3).clearContent();
    sheet.getRange(10, 2, 1000, 3).clearContent();
  }catch(e){
    Browser.msgBox(e);
  }
}

//スプレッドシートへの入力
function setCellValue(sheet_name, row, col, value) {
	let sheet = SpreadsheetApp.getActive().getSheetByName(sheet_name)
	let cell = sheet.getRange(row, col)
	cell.setValue(value)
}

//スプレッドシートに入力されている内容の取得
function getCellName(sheet_name, row, col) {
	let sheet = SpreadsheetApp.getActive().getSheetByName(sheet_name);
	return sheet.getRange(row, col).getValue();
}
