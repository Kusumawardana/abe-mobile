// dev server
// var API_URL = 'http://10.0.2.2:8001';
// var API_URLNEW = 'http://10.0.2.2:8000';

//prod server
var API_URL = 'http://api.intiru.com';
var API_URLNEW = 'http://abe.intiru.com';

var _config = {
    LOGIN : API_URL+'/login/proses', //post
    LOGOUT : API_URL+'/logout/', //get
    PROFILE : API_URL+'/login/profile/', //get
    FEEDBACK : API_URL+'/feedback/create', //post
    NEWS : API_URL+'/berita/read/', //get
    ANNOUNCEMENT : API_URL+'/pengumuman/read/', //get
    CATEGORYFLASHCARD : API_URL+'/jenisflashcard/read/', //get
    FLASHCARDTYPE : API_URL+'/flashcard/read/', //get
    FLASHCARDTYPEALL : API_URL+'/flashcard/readall/', //get
    CHILDREN : API_URL+'/anak/readspesific/', //get
    CHILDRENSALL : API_URL + '/anak/readanak/',
    DEVELOPMENT : API_URL+'/perkembangan/read/', //get
    DEVELOPMENTCREATE : API_URL+'/perkembangan/create', //post
    DEVELOPMENTDELETE :API_URL +'/perkembangan/delete/', //get
    RESPONS : API_URL+'/respon/read/', //get
    RESPONSCREATEORTU : API_URL+'/respon/createortu', //post
    RESPONSDELETEORTU : API_URL+'/respon/deleteortu/', //get
    MYFLASHCARD : API_URL+'/flashcard/myread/', //get
    MYFLASHCARDDELETE : API_URLNEW+'/flashcard/apidelete/', //get
    MYFLASHCARDCREATE : API_URLNEW+'/flashcard/create', //post
    USERTYPE : API_URL+'/jenispengguna/read/', //get
    USER : API_URL+'/pengguna/read/', //get
    USERTYPE : API_URL+'/jenispengguna/read/', //get
    SHAREDCREATE : API_URL+'/dibagikan/create', //post
    SHAREDSEND : API_URL + '/dibagikan/readpengirim/', //get
    SHAREDRECEIVE : API_URL + '/dibagikan/readpenerima/', //get
    FLASHCARDVALID : API_URL + '/flashcard/readvalid/', //get
    DIFFERENTMY : API_URL + '/perbedaan/myread/',
    DIFFERENTADMIN : API_URL + '/perbedaan/readadmin/',
    DIFFERENTCREATE : API_URLNEW + '/perbedaan/apicreate', // post
    DIFFERENTDELETE : API_URLNEW + '/perbedaan/apidelete/',
    COMPARISON : API_URL + '/perbedaan/comparison/',
    DIFFRENT_NOTIFY_ANSWER : API_URL + '/perbedaan/notify/'
};

function getEnvironment() {
    return _config
}

var config = getEnvironment();
module.exports = config;
