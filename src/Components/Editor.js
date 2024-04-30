import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css'; // Add CSS mode
import 'codemirror/mode/xml/xml'; // Add HTML/XML mode
import 'codemirror/mode/clike/clike'; // Add C, C++, Java, C#, etc. mode
import 'codemirror/mode/python/python'; // Add Python mode
import 'codemirror/mode/rust/rust'; // Add Rust mode
import 'codemirror/mode/ruby/ruby'; // Add Ruby mode
import 'codemirror/mode/dart/dart'; // Add Dart mode
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import { Socket } from 'socket.io-client';
import ACTIONS from '../Action';

const Editor = ({socketRef, roomId}) => {
  const editorRef = useRef(null);

  useEffect(() => { 
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: 'javascript',
        lineNumbers: true,
        theme: '3024-night',
        autoCloseTags: true,
        autoCloseBrackets: true,
        
      });
      editorRef.current.on('change', (instance,changes)=>{
        console.log('changes',changes)
        const {origin}= changes;
        const code = instance.getValue();
        if(origin!= 'setValue'){
              socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                roomId
              });
        }
      })
    }
    init();
  }, []);


  return (
    <textarea id="realtimeEditor">
       <Editor socketRef={socketRef.current} roomId={roomId}/>
    </textarea>
  );
};

export default Editor;
