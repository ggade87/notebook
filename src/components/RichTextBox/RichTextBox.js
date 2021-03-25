import React, { Component } from "react";
import { stateToHTML } from "draft-js-export-html";
import {AtomicBlockUtils,convertFromRaw, Modifier,  CompositeDecorator,convertToRaw,convertFromHTML, Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./RichTextBox.css";
import createStyles from 'draft-js-custom-styles';
import Resizer from 'react-image-file-resizer';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import Tooltip from '@material-ui/core/Tooltip';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Button from '@material-ui/core/Button';
const customStyleMap = {
  MARK: {
    backgroundColor: 'Yellow',
    fontStyle: 'italic',
  },
 };
 
 // Passing the customStyleMap is optional
 const { styles , customStyleFn, exporter } = createStyles(['font-size','font-family', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);

const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file,200, 200, 'JPEG', 100, 0,
  uri => {
    resolve(uri);
  },
  'base64'
  );
});




const Link2 = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank">
      {props.children}
    </a>
  );
};

    const convertToEditorState = (editorContent) => {
      const content = convertFromRaw(JSON.parse(editorContent));
      const editorState = EditorState.createWithContent(content, decorator);
      return editorState;
    };
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link2,
      },
    ]);
class RichTextBox extends Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    
    this.state = {
      editorState:  this.props.value ?  convertToEditorState(this.props.value) :  EditorState.createEmpty(decorator)  ,
      editorContentHtml: "", 
      showURLInput: false,
      urlValue: '',
      notificationclass:"popuptext"
    };
    

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => { const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
      //this.props.handleData(stateToHTML(editorState.getCurrentContent()));
     // const rawDraftContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()) );
     const rawDraftContentState = convertToRaw(editorState.getCurrentContent());//convertToRaw(editorState.getCurrentContent())  ;
     const obj= JSON.stringify(rawDraftContentState, null, 2)
     this.props.handleData(obj);
      this.setState({
        editorState,
        editorContentHtml: stateToHTML(editorState.getCurrentContent()),
      });
    };
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

    //Link code
    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.toggleColor = this._toggleColor.bind(this);
    this.updateEditorState = editorState => this.setState({ editorState });

    this.imageRef = React.createRef();
    this.audioRef = React.createRef();
    this.videoRef = React.createRef();
  }

  //This function set state when edit called.
  getState = (val) => {
    
    const blocksFromHTML = convertFromHTML(val);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
     const editorState =EditorState.createWithContent(state);
    return val;
    //return EditorState.createWithContent(ContentState.createFromText(val));
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) { 
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  //Link code start
  _promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const {editorState, urlValue} = this.state;
    const contentState = editorState.getCurrentContent();
    if(!urlValue.startsWith("https://"))
    {
      alert("Invalid url");
      return;
    }
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',  
      {url: urlValue, target: '_blank',}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    console.log(editorState)
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }
  //Link code end
  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  toggleFontSize = fontSize => {
    const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);

    return this.updateEditorState(newEditorState);
  };

  toggleFontFamily = fontFamily => {
    const newEditorState = styles.fontFamily.toggle(this.state.editorState, fontFamily);

    return this.updateEditorState(newEditorState);
  };

  removeFontSize = () => {
    const newEditorState = styles.fontSize.remove(this.state.editorState);

    return this.updateEditorState(newEditorState);
  };

  addFontSize = val => () => {
    const newEditorState = styles.fontSize.add(this.state.editorState, val);

    return this.updateEditorState(newEditorState);
  };

  toggleTextTransform = color => {
    const newEditorState = styles.textTransform.toggle(this.state.editorState, color);

    return this.updateEditorState(newEditorState);
  };
  uploadFileClick = (type) =>{
    if(type === "Image"){
      this.imageRef.current.click();
    }else if(type === "Audio"){
      this.audioRef.current.click();
    }else if(type === "Video"){
      this.videoRef.current.click();
    }
  }
  handleImageSelect = async (event) => {
    alert(event)
    event.preventDefault();
    var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
    var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
    isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
    if (true) { //yes
      alert(extension)

       let file = event.target.files[0];
       let reader = new FileReader();
       const image = await resizeFile(file) 
       const {editorState, urlValue, urlType} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
        'image',
        'MUTABLE',
        { src:  image},
        );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );

    this.setState({
      // The third parameter here is a space string, not an empty string
      // If you set an empty string, you will get an error: Unknown DraftEntity key: null
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
      //  reader.readAsDataURL(image);
      //  reader.onloadend = () => {
      //    alert(reader.result )
      //     //  base64: reader.result,
          
      //  };
    }else{
       alert("Invalid image. Only 'jpg', 'jpeg', 'png' file allowed.")
   }
}


handleAudioSelect = async (event) => {
  alert(event)
  event.preventDefault();
  var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
  var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
  isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
  if (true) { //yes
    alert(extension)

     let file = event.target.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onloadend = () => {
      
        //  base64: reader.result,
        const {editorState, urlValue, urlType} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "audio",
          'IMMUTABLE',
          {src: reader.result}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
          editorState,
          {currentContent: contentStateWithEntity}
        );
    
        this.setState({
          // The third parameter here is a space string, not an empty string
          // If you set an empty string, you will get an error: Unknown DraftEntity key: null
          editorState: AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
          setTimeout(() => this.focus(), 0);
        });
     };
  }else{
     alert("Invalid image. Only 'jpg', 'jpeg', 'png' file allowed.")
 }
}

handleVedioSelect = async (event) => {
  alert(event)
  event.preventDefault();
  var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
  var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
  isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
  if (true) { //yes
    alert(extension)

     let file = event.target.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onloadend = () => {
      
        //  base64: reader.result,
        const {editorState, urlValue, urlType} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "video",
          'IMMUTABLE',
          {src: reader.result}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
          editorState,
          {currentContent: contentStateWithEntity}
        );
    
        this.setState({
          // The third parameter here is a space string, not an empty string
          // If you set an empty string, you will get an error: Unknown DraftEntity key: null
          editorState: AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
          setTimeout(() => this.focus(), 0);
        });
     };
  }else{
     alert("Invalid image. Only 'jpg', 'jpeg', 'png' file allowed.")
 }
}


showFunction = (id)  =>  { 
  if(id === "PopupNotification"){
    if(this.state.notificationclass === "show"){
      // this.setState({notificationclass:"popuptext"})
    }else{
      this.setState({notificationclass:"show"})
    }
  }else{
    this.setState({notificationclass:"popuptext"})
  }
}

hideFunction = (id)  =>  { 
  if(id === "PopupNotification"){
    if(this.state.notificationclass === "show"){
       this.setState({notificationclass:"popuptext"})
    }else{
      // this.setState({notificationclass:"show"})
    }
  }else{
    // this.setState({notificationclass:"popuptext"})
  }
}
  render() {
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    console.log(editorState)
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    const options = x => x.map(fontSize => {
      return <option key={fontSize} value={fontSize}>{fontSize}</option>;
    });
    //Link code start
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>;
    }

    //Link code End

    return (
      <div className="RichEditor-root">
       <div className="Container"  > 
           
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
          <div>
          <Tooltip title="Insert Link">
                <InsertLinkIcon className="inserlink"  
                  onMouseDown={this.promptForLink}
                  style={{marginRight: 10}}> 
                  Add Link
                </InsertLinkIcon>
            </Tooltip>
            <Tooltip title="Remove Link">
              <LinkOffIcon  className="inserlink"  onMouseDown={this.removeLink}>
                Remove Link
              </LinkOffIcon >
            </Tooltip>
       
          {urlInput} 
          </div>
        </div><div className="Container"  > 
        <div className="popup"  onMouseOver={() => this.showFunction("PopupNotification")}>     Color
         <span onMouseOut={() => this.hideFunction("PopupNotification")}  onClick={() => this.hideFunction("PopupNotification")}   className={this.state.notificationclass} id="PopupNotification" >
          <ColorControls
                editorState={editorState}
                onToggle={this.toggleColor}
              />   </span> </div>
                <div style={{ flex: '1 0 25%' }}>
          {/* <button
            onClick={this.removeFontSize}
          >
            Remove FontSize
          </button>
          <button
            onClick={this.addFontSize('24px')}
          >
            Add FontSize
          </button> */}
         
          <select  className="select"  onChange={e => this.toggleFontSize(e.target.value)}>
            {options(['Size','8px','10px','12px','16px', '24px', '36px', '50px', '72px'])}
          </select>
          {/* <select onChange={e => this.toggleColor(e.target.value)}>
            {options(['color','green', 'blue', 'red', 'purple', 'orange', 'yellow', 'indigo', 'violet'])}
          </select> */}
          <select  className="select"  onChange={e => this.toggleTextTransform(e.target.value)}>
            {options(['uppercase', 'capitalize'])}
          </select> 
          <select  className="select"  onChange={e => this.toggleFontFamily(e.target.value)}>
            {options(['Times New Roman','Georgia, serif','Courier New, monospace','sans-serif', 'Helvetica, sans-serif', 'Verdana, sans-serif', 'Trebuchet MS, sans-serif'])}
          </select> </div>
          <div className="Container"  >
          <Tooltip title="Add Image">
            <div >
                <input  ref={this.imageRef} style={{display:"none"}} type="file" onChange={this.handleImageSelect}></input>
                <Button  className="uploadBtn"    onClick={() => this.uploadFileClick('Image')}   
                              startIcon={  <AddAPhotoIcon  />  } >
                </Button> 
            </div>
         </Tooltip>
          <Tooltip title="Add Audio">
            <div>
          <input   ref={this.audioRef} style={{display:"none"}}  type="file" onChange={this.handleAudioSelect}></input>
          <Button  className="uploadBtn"      onClick={() => this.uploadFileClick('Audio')} disabled={this.state.imageProccesing} 
                        startIcon={  <AudiotrackIcon   />   } >
          </Button> 
          </div>
         </Tooltip>
          <Tooltip title="Add video">
            <div>
          <input   ref={this.videoRef} style={{display:"none"}}  type="file" onChange={this.handleVedioSelect}></input>
           <Button  className="uploadBtn"      onClick={() => this.uploadFileClick('Video')} disabled={this.state.imageProccesing} 
                        startIcon={ <SwitchVideoIcon   /> } >
          </Button> </div>
         </Tooltip>
        </div>
        </div>
        <div className={className} onClick={this.focus}>
          <Editor  blockRendererFn={mediaBlockRenderer}
            customStyleFn={customStyleFn}
            customStyleMap={colorStyleMap}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

//Color start
var COLORS = [
  {label: 'Red', style: 'red'},
  {label: 'Orange', style: 'orange'},
  {label: 'Yellow', style: 'yellow'},
  {label: 'Green', style: 'green'},
  {label: 'Blue', style: 'blue'},
  {label: 'Indigo', style: 'indigo'},
  {label: 'Violet', style: 'violet'},
];

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div style={stylesColor.controls}>
      {COLORS.map((type,index) => {
        return  (
        <ColorButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          backgroundColor={type.style}
        />
        )  }
     
        ) }
    </div>
  );
};

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
  color: {
    
  },
  arial:{
    fontFamily:"arial"
  }
};

const stylesColor = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 14,
    padding: 20,
    width: 600,
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
    display:"flex"
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};

//color end
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "align-center":
      return "richText-center-block";
    case "align-left":
      return "richText-left-block";
    case "align-right":
      return "richText-right-block";
    case "align-justify":
      return "richText-justify-block";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let style;
    let className = "RichEditor-styleButton";
    if (!this.props.active) {
      style = {color:this.props.label};
    }  
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
 
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {getIcon(this.props.label,this.props.active)}
      </span>
    );
  }
}



class ColorButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let style;
    if (this.props.active) {
      style = {...stylesColor.styleButton, ...colorStyleMap[this.props.style]};
    } else {
      style = stylesColor.styleButton;
    }
    let className = "RichEditor-ColorButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
      className +=" "+ style;
    }
 
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {getIcon(this.props.label,this.props.active)}
      </span>
    );
  }
}
function getIcon(lable,active) {
  if (lable === 'Center') {
    return <FormatAlignCenterIcon />;
  }else if(lable === 'Left'){
    return <FormatAlignLeftIcon  />;
  } else if(lable === 'Right'){
    return <FormatAlignRightIcon   />;
  } else if(lable === 'Justify'){
    return <FormatAlignJustifyIcon    />;
  }else if(lable === 'Bold'){
    return <FormatBoldIcon     />;
  }else if(lable === 'Italic'){
    return <FormatItalicIcon      />;
  }else if(lable === 'Underline'){
    return <FormatUnderlinedIcon />;
  }else if(lable === 'Code Block'){
    return <CodeIcon />;
  }
  else if(lable === 'UL'){
    return <FormatListBulletedIcon  />;
  }
  else if(lable === 'OL'){
    return <FormatListNumberedIcon  />;
  }else if(lable === 'Blockquote'){
    return <FormatQuoteIcon  />;
  }else if(COLORS.some(x => x.label === lable)){
    let color= !active? lable:"";
    return <span className="colorButton" style={{ borderRadius:"2px", padding:"3px 5px",backgroundColor:lable,fontWeight:"bold", fontSize:"12px", cursor: "pointer",color:color }} >O</span>
  }
  
  
  return lable;
}
const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
  { label: "Center", style: "align-center" },
  { label: "Left", style: "align-left" },
  { label: "Right", style: "align-right" },
  { label: "Justify", style: "align-justify" }, 
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => 
        ( <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />     
        
       ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

//Link code
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}  >
      {props.children}
    </a>
  );
};

const styles2 = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  }, 
  media: {
   width:"100%",
   height:"50%"
  },
};

//Media start

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
  return <img src={props.src} style={{width:"100px",height:"100px"}} alt="Image" />;
};

const Video = (props) => {
  return <video controls src={props.src} style={styles2.media} />;
};

const Media = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }

  return media;
};
//Media END
export default RichTextBox;
