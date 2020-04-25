import { StyleSheet, Font } from '@react-pdf/renderer'
Font.register({ family: 'Consolas', src: 'http://localhost:3000/consolas.ttf' })
export default StyleSheet.create({
    document: {
        color: 'grey',
        fontFamily: 'Consolas',
        fontSize:10

    },
    body: {
        paddingTop: 10
        ,paddingBottom: 65
        ,paddingHorizontal: 5
        ,fontSize:10

    },
    title: {
        fontSize: 11
        , textAlign: 'center'
        , fontFamily: 'Consolas'
        , paddingVertical: 10

    },
    author: {
        fontSize: 11,
        textAlign: 'center',
        marginBottom: 40,
    },
    label: {
        fontSize: 9,
        fontFamily: 'Consolas',
        textAlign: 'left',
        color: 'grey',
    },
    subtitle: {
        fontSize: 11,
        fontFamily: 'Consolas',
        textAlign: 'left',
        color: 'grey',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 9,
        color: 'grey',
        textAlign: 'justify',
        fontFamily: 'Consolas'
    },
    textSmall: {
        fontSize: 7,
        color: 'grey',
        textAlign: 'justify',
        fontFamily: 'Consolas'
    },
    pageNumber: {
        position: 'absolute'
        , fontSize: 7
        , bottom: 30
        , left: 0
        , right: 0
        , textAlign: 'center'
        , color: 'grey'
    },
    borderBottom: {
         fontSize: 11
        , textAlign: 'center'
        , color: 'grey'
        , marginBottom: 5
        ///, borderTopWidth: 2
        //, borderTopColor: 'gray'
        //, borderTopStyle: 'dotted'
        , borderBottomWidth: 1.5
        , borderBottomColor: 'gray'
        , flexDirection: 'row'
        , margin: '2'
        , borderBottomStyle: 'dotted'

    },
    headerBorder: {
        flex: 1
        , fontSize: 11
        , textAlign: 'center'
        , color: 'grey'
        , marginBottom: 10
        , borderTopWidth: 2
        , borderTopColor: 'gray'
        , borderTopStyle: 'dotted'
        , borderBottomWidth: 2
        , borderBottomColor: 'gray'
        , flexDirection: 'row'
        , margin: '3'
        , borderBottomStyle: 'dotted'
    },
    flexBox: {
        display: 'flex'
        ,flexDirection: 'row'
        ,alignItems: 'stretch'
        ,justifyContent: 'flex-start'
    }
    ,column1: {
        width: '50%'
        , flexGrow: 1
        , padding: 5
    },
    column2: {
        width: '50%'
        , flexGrow: 2
        , padding: 5
    },
    fieldGroup: {
        flex: 1
        , flexDirection: 'row'
        , margin: '1'
    },
    flex1: {
        flex: 1 
    },
    flex2: {
        flex: 2 
    },
    group:{
        marginBottom: 5
        ,marginTop: 5
    },
    groupAssinatura:{
        marginBottom: 5
        ,marginTop: 5
        ,minHeight: 100
       
        ,maxHeight: 120
    },
    image:{
        maxHeight: 80
        ,maxWidth: 160
        ,marginVertical: 15
        , marginHorizontal: 100
    },
    imageAss:{
        maxHeight: 100
        ,maxWidth: 200
        ,marginVertical: 15
        , marginHorizontal: 10
    },
    logo:{
        maxHeight: '80' 
        ,maxWidth: '100'
    }
})
