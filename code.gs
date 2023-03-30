//通常の名前変更履歴の検索を行う
function searchNamehistory(){
  const lounge_name = getCellName('PC', 2, 3)
  
  //A,JSONデータの取得と読み込み
  const requestUrl = `https://www.mk8dx-lounge.com/api/player/details?name=`+lounge_name; //リクエスト先(zipcloud)
  const response = UrlFetchApp.fetch(requestUrl).getContentText();//フェッチ通信
  const json = JSON.parse(response);//JSON読み込み

  //B,一致する住所をJSONデータから出力
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
        setCellValue('PC', 5, 3, all)
      }

      setCellValue('PC', 10+j, 2, all); // シート名 行 列 値
      j++;
    }

    //Name
    for(i=namehistory.length-1; 0<=i; i--){
      setCellValue('PC', 10+k, 3, namehistory[i].name); // シート名 行 列 値
      k++;
    }

    Logger.log(namehistory.length);

  }
  else{
    Logger.log("Error!");
    setCellValue('PC', 10+j, 2, "Error!"); // シート名 行 列 値
  }

}

//GASで編集された部分を削除する
function allclear(){
  try{
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(5, 3).clearContent();
    sheet.getRange(10, 2, 1000, 3).clearContent();
  }catch(e){
    Browser.msgBox(e);
  }
}

//スマホのために自動更新する関数
function smartphone(){
  try{
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(5, 3).clearContent();
    sheet.getRange(10, 2, 1000, 3).clearContent();
  }catch(e){
    Browser.msgBox(e);
  }

    const lounge_name = getCellName('SmartPhone', 2, 3)
  
  //A,JSONデータの取得と読み込み
  const requestUrl = `https://www.mk8dx-lounge.com/api/player/details?name=`+lounge_name; //リクエスト先(zipcloud)
  const response = UrlFetchApp.fetch(requestUrl).getContentText();//フェッチ通信
  const json = JSON.parse(response);//JSON読み込み

  //B,一致する住所をJSONデータから出力
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
        setCellValue('SmartPhone', 5, 3, all)
      }

      setCellValue('SmartPhone', 10+j, 2, all); // シート名 行 列 値
      j++;
    }

    //Name
    for(i=namehistory.length-1; 0<=i; i--){
      setCellValue('SmartPhone', 10+k, 3, namehistory[i].name); // シート名 行 列 値
      k++;
    }

    Logger.log(namehistory.length);

  }
  else{
    Logger.log("Error!");
    setCellValue('SmartPhone', 10+j, 2, "Error!"); // シート名 行 列 値
  }
}

//受け取ったものをスプレッドシートに入力
function setCellValue(sheet_name, row, col, value) {
	let sheet = SpreadsheetApp.getActive().getSheetByName(sheet_name)
	let cell = sheet.getRange(row, col)
	cell.setValue(value)
}

//スプレッドシートに書いている内容を取得する
function getCellName(sheet_name, row, col) {
	let sheet = SpreadsheetApp.getActive().getSheetByName(sheet_name);
	return sheet.getRange(row, col).getValue();
}
