import React, { useEffect, useState } from 'react';
import { Container, Dialog, IconButton, makeStyles, Snackbar, Typography } from '@material-ui/core';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import '../zdogui.css';
import { CodeJar } from 'codejar';
import createScript from '../createScript';
import hljs from 'highlight.js';


const useStyles = makeStyles((theme) => ({
    invisible: {
        visibility: 'hidden'
    },
    container: {
        paddingTop: 24,
        backgroundColor: '#fafafa'
    },
    snackbar: {
        backgroundColor: 'white',
        color: 'black'
    },
    extraMarginTop: {
        marginTop: '36px'
    }
}));

function SourceCodeDialog(props) {

    const classes = useStyles();

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [editorVisibility, setEditorVisibility] = [props.editorVisibility[0], props.editorVisibility[1]];
    const [open, setOpen] = [props.open[0], props.open[1]];

    const stateVars = props.stateVars;
    const addedShapes = props.addedShapes;

    function clipboardCopy(elID) {
        let text = document.getElementById(elID).innerText;
        navigator.clipboard.writeText(text).then(function () {
            console.log('copy to clipboard successful');
            // add notification
            setSnackbarOpen(true);
        }, function () {
            console.log('copy to clipboard failed')
        })
    }

    function handleClose() {
        setOpen(false);
        setEditorVisibility(false);
    }

    function removeAllDoubleDashQuotes(scriptString) {
        let fixedScript = scriptString.replaceAll(`"--`, '');
        let fixedScript2 = fixedScript.replaceAll(`--"`, '');
        return fixedScript2;
    }

    function copyShapes() {
        let newshapearry = [];
        newshapearry.push(addedShapes[0]);
        let flattened = newshapearry.flat();
        return flattened;
    }

    useEffect(() => {
        //if (open) {
          
          console.log('open');
          setTimeout(() => {
    
            // HTML snippets
    
            let codetagsHTML_canvas = document.getElementById('codetagsHTML_canvas');
            let codetagsHTML_script = document.getElementById('codetagsHTML_script');

            let cursor = stateVars.animationOption[0] === 'dragRotate' ? 'move' : 'default';
    
            let snippet_canvas =
              `<!-- canvas for Zdog illo -->
    <canvas id="illo" style="background-color:${stateVars.bgColor[0]}; cursor:${cursor};" width="${stateVars.canvas_w[0]}" height="${stateVars.canvas_h[0]}">
      <p>${stateVars.fallback[0]}</p>
    </canvas>`;
    
            let snippet_script = 
            `<!-- Zdog CDN and illo.js -->
    <script src="https://unpkg.com/zdog@1/dist/zdog.dist.min.js"></script>
    <script src="illo.js"></script>`;
    
            let jarHTML_canvas = CodeJar(codetagsHTML_canvas, hljs.highlightAll);
            jarHTML_canvas.updateCode(snippet_canvas);
    
            let jarHTML_script = CodeJar(codetagsHTML_script, hljs.highlightAll);
            jarHTML_script.updateCode(snippet_script);
    
            // JavaScript snippet
      
            let codetagsJS = document.getElementById('codetagsJS');
            
            if (codetagsJS !== null) {
              let jar = CodeJar(codetagsJS, hljs.highlightAll);
    
              if (addedShapes[0].length > 0) {
                let flattened = copyShapes();
                let scriptString = createScript(stateVars, flattened);
                let fixed = removeAllDoubleDashQuotes(scriptString);
                jar.updateCode(fixed);
              }
    
              // Get code
              let mycode = jar.toString();
              //console.log(mycode);
    
              // Listen to updates
              jar.onUpdate((code) => {
                console.log(code);
              });
            }
    
            // set editors to be visible
            setEditorVisibility(true);
    
          }, 200);
        //}
      }, []);


    return (

        <Dialog open={open} maxWidth="md" onClose={handleClose} /* open={open}  */ className={(!editorVisibility) ? classes.invisible : ''}>
            <Container className={classes.container}>
                <div className="editorHeader">
                    <Typography>HTML</Typography>
                </div>
                <div className="contentcopy">
                    <IconButton onClick={() => clipboardCopy('editorHTML_canvas')} id="copyHTML_canvas" aria-label="Copy to clipboard"><ContentCopyOutlinedIcon fontSize='small' /></IconButton>
                </div>
                <div id="editorHTML_canvas">
                    <pre>
                        <code id="codetagsHTML_canvas" className="language-html">''
                        </code>
                    </pre>
                </div>
                <div className="contentcopy">
                    <IconButton onClick={() => clipboardCopy('editorHTML_script')} id="copyHTML_script" aria-label="Copy to clipboard"><ContentCopyOutlinedIcon fontSize="small" /></IconButton>
                </div>
                <div id="editorHTML_script">
                    <pre>
                        <code id="codetagsHTML_script" className="language-html">''
                        </code>
                    </pre>
                </div>
                <div className="editorHeader">
                    <Typography className={classes.extraMarginTop}>JavaScript</Typography>
                </div>
                <div className="contentcopy">
                    <IconButton onClick={() => clipboardCopy('editor')} id="copyJS" aria-label="Copy to clipboard"><ContentCopyOutlinedIcon fontSize="small" /></IconButton>
                </div>
                <div id="editor">
                    <pre>
                        <code id="codetagsJS" className="language-javascript">''
                        </code>
                    </pre>
                </div>
                <Snackbar
                    ContentProps={{ className: classes.snackbar }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    message="Copied to clipboard!"
                />
            </Container>

        </Dialog>
    )
}

export default SourceCodeDialog;