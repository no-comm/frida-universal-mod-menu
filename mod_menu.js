

function getClassLoader() {
    const classLoader = {
        Gravity: Java.use("android.view.Gravity"),
        TextView: Java.use("android.widget.TextView"),
        LinearLayout: Java.use("android.widget.LinearLayout"),
        ViewGroup_LayoutParams: Java.use("android.view.ViewGroup$LayoutParams"),
        LinearLayout_LayoutParams: Java.use("android.widget.LinearLayout$LayoutParams"),
        Color: Java.use("android.graphics.Color"),
        ActivityThread: Java.use("android.app.ActivityThread"),
        ActivityThread_ActivityClientRecord: Java.use("android.app.ActivityThread$ActivityClientRecord"),
        View_OnTouchListener: Java.use("android.view.View$OnTouchListener"),
        MotionEvent: Java.use("android.view.MotionEvent"),
        String: Java.use("java.lang.String"),
        ScrollView: Java.use("android.widget.ScrollView"),
        View_OnClickListener: Java.use("android.view.View$OnClickListener"),
        SeekBar: Java.use("android.widget.SeekBar"),
        RadioGroup: Java.use("android.widget.RadioGroup"),
        RadioButton: Java.use("android.widget.RadioButton"),
        Button: Java.use("android.widget.Button"),
        EditText: Java.use("android.widget.EditText"),
        TextWatcher: Java.use("android.text.TextWatcher"),
        Switch: Java.use("android.widget.Switch"),
        CompoundButton_OnCheckedChangeListener: Java.use("android.widget.CompoundButton$OnCheckedChangeListener"),
        AdapterView_OnItemSelectedListener: Java.use("android.widget.AdapterView$OnItemSelectedListener"),
        Spinner: Java.use("android.widget.Spinner"),
        ArrayAdapter: Java.use("android.widget.ArrayAdapter"),

    }
    return classLoader
}

function pixelDensityToPixels(context, dp) {
    const density = context.getResources().getDisplayMetrics().density.value
    return parseInt(dp * density)
}

function waitForMainActivity(classLoader) {
    return new Promise((resolve) => {
    let f = setInterval(() => {
        try {
            const activityThread = classLoader.ActivityThread.sCurrentActivityThread.value;
            if (activityThread) {
                const mActivities = activityThread.mActivities.value;
                if (mActivities.size() > 0) {
                    const activityClientRecord = Java.cast(mActivities.valueAt(0), classLoader.ActivityThread_ActivityClientRecord);
                    const activity = activityClientRecord.activity.value;

                    if (activity) {
                        console.log("Main activity found: " + activity.getClass().getName());
                        clearInterval(f);
                        resolve(activity);
                    }
                }
            }
        } catch (e) {}

    }, 250);
    });
}


class Menu {
    #classLoader
    #activity
    #MATCH_PARENT
    #mainLayout
    #menuStart
    #menuLayout
    #menuBarLayout
    #menuBarTitle
    #menuScroll
    #menuOptions
    #options
    #contentView
    #WRAP_CONTENT
    #menuScrollLayout
    #menuScrollView


    constructor(classLoader, activity) {
        this.#classLoader = classLoader
        this.#activity = activity
        this.#MATCH_PARENT = classLoader.LinearLayout_LayoutParams.MATCH_PARENT.value
        this.#WRAP_CONTENT = classLoader.LinearLayout_LayoutParams.WRAP_CONTENT.value
        this.#options = {}
        this.#createContentView()
        this.#createMainLayout()
        this.#createMenuScroll()
    }

    #createContentView() {
        this.#contentView = this.#classLoader.LinearLayout.$new(this.#activity)
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#MATCH_PARENT)
        this.#contentView.setLayoutParams(layoutParams)
        this.#contentView.setGravity(this.#classLoader.Gravity.CENTER.value)
        this.#contentView.setBackgroundColor(this.#classLoader.Color.TRANSPARENT.value)
    }

    #createMainLayout() {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT)
        this.#mainLayout = this.#classLoader.LinearLayout.$new(this.#activity)
        this.#mainLayout.setLayoutParams(layoutParams)
    }

    #createMenuScroll() {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
        this.#menuScrollView = this.#classLoader.ScrollView.$new(this.#activity)
        const padding = pixelDensityToPixels(this.#activity, 8)
        this.#menuScrollView.setLayoutParams(layoutParams)
        this.#menuScrollView.setPadding(padding, padding, padding, padding)
        this.#menuScrollView.mFillViewport.value = true
    }

    #createMenuScrollLayout() {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
        this.#menuScrollLayout = this.#classLoader.LinearLayout.$new(this.#activity)
        this.#menuScrollLayout.setLayoutParams(layoutParams)
        this.#menuScrollLayout.setOrientation(this.#menuScrollLayout.VERTICAL.value)
    }

    createMenuOptionsLayout() {
        this.#createMenuScroll()
        this.#createMenuScrollLayout()
    }

    createMenuStart(title, size, color) {
        size = pixelDensityToPixels(this.#activity, size)
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT)
        this.#menuStart = this.#classLoader.TextView.$new(this.#activity)
        this.#menuStart.setLayoutParams(layoutParams)
        this.#menuStart.setText(this.#classLoader.String.$new(title))
        this.#menuStart.setTextSize(size)
        this.#menuStart.setTextColor(this.#classLoader.Color.parseColor(color))
    }

    createMenuLayout(color, size) {
        const SIZE_DP = pixelDensityToPixels(this.#activity, size)
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(SIZE_DP, SIZE_DP)
        this.#menuLayout = this.#classLoader.LinearLayout.$new(this.#activity)
        this.#menuLayout.setLayoutParams(layoutParams)
        this.#menuLayout.setBackgroundColor(this.#classLoader.Color.parseColor(color))
        this.#menuLayout.setOrientation(this.#menuLayout.VERTICAL.value)
    }

    createMenuBarLayout(color) {
        const padding = pixelDensityToPixels(this.#activity, 10)
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
        this.#menuBarLayout = this.#classLoader.LinearLayout.$new(this.#activity)
        this.#menuBarLayout.setLayoutParams(layoutParams)
        this.#menuBarLayout.setBackgroundColor(this.#classLoader.Color.parseColor(color))
        this.#menuBarLayout.setPadding(padding, padding, 0, padding)
    }

    createMenuBarTitle(title, color) {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT)
        this.#menuBarTitle = this.#classLoader.TextView.$new(this.#activity)
        this.#menuBarTitle.setLayoutParams(layoutParams)
        this.#menuBarTitle.setText(this.#classLoader.String.$new(title))
        this.#menuBarTitle.setTextColor(this.#classLoader.Color.parseColor(color))
    }

    #drawContentView() {
        this.#activity.addContentView(this.#contentView, this.#contentView.getLayoutParams())
    }

    #drawMainLayout() {
        this.#contentView.addView(this.#mainLayout)
    }

    #drawMenuStart() {
        this.#mainLayout.addView(this.#menuStart)
    }

    #drawMenuLayout() {
        this.#mainLayout.addView(this.#menuLayout)
    }

    #drawMenuBarLayout() {
        this.#menuLayout.addView(this.#menuBarLayout)
    }

    #drawMenuBarTitle() {
        this.#menuBarLayout.addView(this.#menuBarTitle)
    }

    #drawMenuOptions() {
        this.#menuLayout.addView(this.#menuScrollView)
        this.#menuScrollView.addView(this.#menuScrollLayout)
    }

    #createOptionClickEvent(id, optionView, callbacks) {
        const classLoader = this.#classLoader
        let optionState = false
        const optionOnClickListener = Java.registerClass({
            name: "com.example." + id,
            implements: [classLoader.View_OnClickListener],
            methods: {
                onClick(p1) {
                    if (!optionState) {
                        optionView.setBackgroundColor(classLoader.Color.parseColor("#64ff59"))
                        optionView.setTextColor(classLoader.Color.parseColor("#000000"))
                        optionState = true
                        callbacks.on()
                    } else {
                        optionView.setBackgroundColor(classLoader.Color.parseColor("#f53131"))
                        optionView.setTextColor(classLoader.Color.parseColor("#ffffff"))
                        optionState = false
                        callbacks.off()
                    }
                }
            }
        })
        optionView.setOnClickListener(optionOnClickListener.$new())
    }

    addOption(id, name, callbacks) {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
        const padding = pixelDensityToPixels(this.#activity, 5)
        const option = this.#classLoader.TextView.$new(this.#activity)
        const margin = pixelDensityToPixels(this.#activity, 10)
        option.setText(this.#classLoader.String.$new(name))
        option.setBackgroundColor(this.#classLoader.Color.parseColor("#f53131"))
        option.setTextColor(this.#classLoader.Color.parseColor("#ffffff"))
        layoutParams.setMargins(0, 0, 0, margin)
        option.setLayoutParams(layoutParams)
        option.setPadding(padding, padding, 0, padding)
        this.#menuScrollLayout.addView(option)
        this.#createOptionClickEvent(id, option, callbacks)
    }


    #createButtonClickEvent(id, optionView, callbacks) {
        const classLoader = this.#classLoader

        const buttonOnTouchListener = Java.registerClass({
            name: "com.example." + id + ".TouchListener",
            implements: [classLoader.View_OnTouchListener],
            methods: {
                onTouch(v, event) {
                    switch (event.getAction()) {
                        case classLoader.MotionEvent.ACTION_DOWN.value:
                            v.setBackgroundColor(classLoader.Color.parseColor("#f53131"));
                            break;
                        case classLoader.MotionEvent.ACTION_UP.value:
                            callbacks.onClick()
                            v.setBackgroundColor(classLoader.Color.parseColor("#c2bebe"));
                            break;
                        case classLoader.MotionEvent.ACTION_CANCEL.value:
                            v.setBackgroundColor(classLoader.Color.parseColor("#c2bebe"));
                            break;
                    }
                    return true;
                }
            }
        });

        optionView.setOnTouchListener(buttonOnTouchListener.$new())
    }

    addButton(id, name, callbacks, height = this.#MATCH_PARENT, width = this.#WRAP_CONTENT) {
        if (height == 0) height = this.#MATCH_PARENT
        if (width == 0) width = this.#WRAP_CONTENT
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(height, width)
        const padding = pixelDensityToPixels(this.#activity, 5)
        const button = this.#classLoader.Button.$new(this.#activity)
        const margin = pixelDensityToPixels(this.#activity, 10)
        button.setText(this.#classLoader.String.$new(name))
        button.setBackgroundColor(this.#classLoader.Color.parseColor("#c2bebe"))
        button.setTextColor(this.#classLoader.Color.parseColor("#75757B"))
        layoutParams.setMargins(0, 0, 0, margin)
        button.setLayoutParams(layoutParams)
        button.setPadding(padding, padding, 0, padding)
        this.#menuScrollLayout.addView(button)
        this.#createButtonClickEvent(id, button, callbacks)
    }

    #createDestroyClickEvent(optionView){
        const classLoader = this.#classLoader
        const contentView = this.#contentView
        const buttonOnClickListener = Java.registerClass({
            name: "com.example.DestroyClickListener",
            implements: [classLoader.View_OnClickListener],
            methods: {
                onClick(p1) {
                    const viewToRemove = Java.cast(contentView, Java.use("android.view.View"));
                    const parent = viewToRemove.getParent();
                    const parentViewGroup = Java.cast(parent, Java.use("android.view.ViewGroup"));
                    parentViewGroup.removeView(viewToRemove);
                }
            }
        })
        optionView.setOnClickListener(buttonOnClickListener.$new())
    }

    addDestroyButton(height = this.#MATCH_PARENT, width = this.#WRAP_CONTENT) {
        if (height == 0) height = this.#MATCH_PARENT
        if (width == 0) width = this.#WRAP_CONTENT
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(height, width)
        const padding = pixelDensityToPixels(this.#activity, 5)
        const button = this.#classLoader.Button.$new(this.#activity)
        const margin = pixelDensityToPixels(this.#activity, 10)
        button.setText(this.#classLoader.String.$new("Exit"))
        button.setBackgroundColor(this.#classLoader.Color.parseColor("#c2bebe"))
        button.setTextColor(this.#classLoader.Color.parseColor("#75757B"))
        layoutParams.setMargins(0, 0, 0, margin)
        button.setLayoutParams(layoutParams)
        button.setPadding(padding, padding, 0, padding)
        this.#menuScrollLayout.addView(button)
        this.#createDestroyClickEvent(button);
    }

    #createRadioButtonClickEvent(id, optionView, group, callbacks) {
        const classLoader = this.#classLoader;
        const buttonOnClickListener = Java.registerClass({
            name: "com.example." + id,
            implements: [classLoader.View_OnClickListener],
            methods: {
                onClick(p1) {
                    group.forEach(button => {
                        button.setBackgroundColor(classLoader.Color.parseColor("#c2bebe"));
                        button.setTextColor(classLoader.Color.parseColor("#75757B"));
                    });
    
                    p1.setBackgroundColor(classLoader.Color.parseColor("#64ff59"));
                    p1.setTextColor(classLoader.Color.parseColor("#ffffff"));
    
                    callbacks.onClick();
                }
            }
        });
        optionView.setOnClickListener(buttonOnClickListener.$new());
    }

    addRadioButton(id, name, group, callbacks) {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT);
        const padding = pixelDensityToPixels(this.#activity, 5);
        const radioButton = this.#classLoader.RadioButton.$new(this.#activity);
        const margin = pixelDensityToPixels(this.#activity, 10);
    
        radioButton.setText(this.#classLoader.String.$new(name));
        radioButton.setTextColor(this.#classLoader.Color.parseColor("#75757B"));
        layoutParams.setMargins(0, 0, 0, margin);
        radioButton.setLayoutParams(layoutParams);
        radioButton.setPadding(padding, padding, 0, padding);
    
        group.addView(radioButton, 0, layoutParams);
    
        this.#createRadioButtonClickEvent(id, radioButton, group, callbacks);
    }
    
    createRadioGroup() {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT);
        const radioGroup = this.#classLoader.RadioGroup.$new(this.#activity);
    
        radioGroup.setLayoutParams(layoutParams);
        this.#menuScrollLayout.addView(radioGroup);
    
        return radioGroup;
    }

    #createTextInputEvent(id, editText, callbacks) {
        const classLoader = this.#classLoader;
        const textWatcher = Java.registerClass({
            name: "com.example." + id + ".TextWatcher",
            implements: [classLoader.TextWatcher],
            methods: {
                afterTextChanged(s) {},
                beforeTextChanged(s, start, count, after) {},
                onTextChanged(s, start, before, count) {
                    if (callbacks && callbacks.onTextChanged) {
                        callbacks.onTextChanged(s, start, before, count);
                    }
                }
            }
        });
    
        editText.addTextChangedListener(textWatcher.$new());
    }

    addTextInput(id, hint, callbacks) {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT);
        const padding = pixelDensityToPixels(this.#activity, 5);
        const editText = this.#classLoader.EditText.$new(this.#activity);
        const margin = pixelDensityToPixels(this.#activity, 10);
    
        editText.setHint(this.#classLoader.String.$new(hint));
        editText.setBackgroundColor(this.#classLoader.Color.parseColor("#ffffff"));
        editText.setTextColor(this.#classLoader.Color.parseColor("#000000"));
        layoutParams.setMargins(0, 0, 0, margin);
        editText.setLayoutParams(layoutParams);
        editText.setPadding(padding, padding, padding, padding);
    
        this.#menuScrollLayout.addView(editText);
    
        this.#createTextInputEvent(id, editText, callbacks);
    }


    #createToggleEvent(id, toggle, callbacks) {
        const toggleOnCheckedChangeListener = Java.registerClass({
            name: "com.example." + id + ".ToggleListener",
            implements: [this.#classLoader.CompoundButton_OnCheckedChangeListener],
            methods: {
                onCheckedChanged(buttonView, isChecked) {
                    if (callbacks && callbacks.onToggleChange) {
                        callbacks.onToggleChange(isChecked);
                    }
                }
            }
        });
    
        toggle.setOnCheckedChangeListener(toggleOnCheckedChangeListener.$new());
    }

    addToggle(id, text, initialState, callbacks) {
        const layout = this.#classLoader.LinearLayout.$new(this.#activity);
        layout.setOrientation(this.#classLoader.LinearLayout.HORIZONTAL.value);

        const textView = this.#classLoader.TextView.$new(this.#activity);
        textView.setText(this.#classLoader.String.$new(text));
        textView.setTextColor(this.#classLoader.Color.parseColor("#ffffff"));

        const toggle = this.#classLoader.Switch.$new(this.#activity);
        toggle.setChecked(initialState);

        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT);
        layoutParams.setMargins(0, 0, 0, pixelDensityToPixels(this.#activity, 10));

        layout.setLayoutParams(layoutParams);
        toggle.setLayoutParams(layoutParams);

        layout.addView(textView);
        layout.addView(toggle);

        this.#menuScrollLayout.addView(layout);

        this.#createToggleEvent(id, toggle, callbacks);
    }

    addText(text, textSize, textColor) {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT);
        const margin = pixelDensityToPixels(this.#activity, 5);
        const textView = this.#classLoader.TextView.$new(this.#activity);

        textView.setText(this.#classLoader.String.$new(text));
        textView.setTextSize(textSize);
        textView.setTextColor(this.#classLoader.Color.parseColor(textColor));
        layoutParams.setMargins(0, 0, 0, margin);
        textView.setLayoutParams(layoutParams);

        this.#menuScrollLayout.addView(textView);

        return textView;
    }

    changeText(textView, text=null, size=null, color=null) {
        if (text) textView.setText(this.#classLoader.String.$new(text));
        if (size) textView.setTextSize(size);
        if (color) textView.setTextColor(this.#classLoader.Color.parseColor(color));
    }
    
    #createSeekBarEvent(id, seekBar, textView, minValue, textValue, callback) {
        const SeekBarChangeListener = Java.use("android.widget.SeekBar$OnSeekBarChangeListener");
        const SeekBarChangeListenerImplementation = Java.registerClass({
            name: "com.example."+id+".SeekBarChangeListener",
            implements: [SeekBarChangeListener],
            methods: {
                onProgressChanged(seekBar, progress, fromUser) {
                    const value = progress + minValue;
                    const text = Java.use("java.lang.String").$new(textValue+" "+value);

                    textView.setText(text);
                    callback(value,"move");
                },
                onStartTrackingTouch(seekBar) {
                    const progress = seekBar.getProgress()
                    const value = progress + minValue;
                    const text = Java.use("java.lang.String").$new(textValue+" "+value);

                    textView.setText(text);
                    callback(value,"start");

                },
                onStopTrackingTouch(seekBar) {
                    const progress = seekBar.getProgress()

                    const value = progress + minValue;
                    const text = Java.use("java.lang.String").$new(textValue+" "+value);

                    textView.setText(text);
                    callback(value,"end");
                }
            }
        });

        seekBar.setOnSeekBarChangeListener(SeekBarChangeListenerImplementation.$new());
    }

    addSeekBar(id, textValue, initialValue, minValue, maxValue, callback) {
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT);
        const margin = pixelDensityToPixels(this.#activity,1);
        const seekBar = this.#classLoader.SeekBar.$new(this.#activity, null, 0, Java.use("android.R$style").Widget_Holo_SeekBar.value);
        const textView = this.#classLoader.TextView.$new(this.#activity);
        seekBar.setMax(maxValue - minValue);
        seekBar.setProgress(0);
        layoutParams.setMargins(0, 0, 0, margin);
        seekBar.setLayoutParams(layoutParams);
        const text = Java.use("java.lang.String").$new(textValue+ " "+ initialValue);
        textView.setText(text)
        textView.setTextColor(this.#classLoader.Color.parseColor("#75757B"))
        seekBar.setProgress(initialValue);

        this.#menuScrollLayout.addView(textView);
        this.#menuScrollLayout.addView(seekBar);

        textView.setLayoutParams(layoutParams);
        textView.setGravity(this.#classLoader.Gravity.CENTER.value);

        this.#createSeekBarEvent(id, seekBar, textView, minValue, textValue, callback);
    }

    #createDropdownEvent(id, spinner, callbacks) {
        const itemSelectedListener = Java.registerClass({
            name: "com.example." + id + ".ItemSelectedListener",
            implements: [this.#classLoader.AdapterView_OnItemSelectedListener],
            methods: {
                onItemSelected(parent, view, position, id) {
                    if (callbacks && callbacks.onItemSelected) {
                        callbacks.onItemSelected(position);
                    }
                },
                onNothingSelected(parent) {}
            }
        });
    
        spinner.setOnItemSelectedListener(itemSelectedListener.$new());
    }

    addDropdown(id, items, selectedIndex, callbacks) {
        const spinner = this.#classLoader.Spinner.$new(this.#activity);
        
        const arrayAdapter = this.#classLoader.ArrayAdapter.$new(
            this.#activity,
            17367048,
            items
        );
        
        arrayAdapter.setDropDownViewResource(17367049);
        spinner.setAdapter(arrayAdapter);
        
        spinner.setSelection(selectedIndex);
        
        const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT);
        layoutParams.setMargins(0, 0, 0, pixelDensityToPixels(this.#activity, 10));
        spinner.setLayoutParams(layoutParams);
    
        this.#menuScrollLayout.addView(spinner);
    
        this.#createDropdownEvent(id, spinner, callbacks);
    }




    #createMainLayoutEvent() {
        const mainLayout = this.#mainLayout
        const menuLayout = this.#menuLayout
        const menuStart = this.#menuStart
        const classLoader = this.#classLoader
        let initialX = 0
        let initialY = 0
        let isMove = false
        let isMenuLayout = false
        let initialTouchTime = 0
        const MainLayoutOnTouchListener = Java.registerClass({
            name: "com.example.MainLayoutEvent",
            implements: [classLoader.View_OnTouchListener],
            methods: {
                onTouch(view, event) {
                    switch (event.getAction()) {
                        case classLoader.MotionEvent.ACTION_DOWN.value:
                            initialX = view.getX() - event.getRawX();
                            initialY = view.getY() - event.getRawY();
                            isMove = false
                            initialTouchTime = Date.now()
                            break
                        case classLoader.MotionEvent.ACTION_UP.value:
                            if (!isMove) {
                                if (!isMenuLayout) {
                                    mainLayout.removeView(menuStart)
                                    mainLayout.addView(menuLayout)
                                    isMenuLayout = true
                                } else {
                                    mainLayout.removeView(menuLayout)
                                    mainLayout.addView(menuStart)
                                    isMenuLayout = false
                                }
                            }
                            break
                        case classLoader.MotionEvent.ACTION_MOVE.value:
                            view.setX(event.getRawX() + initialX)
                            view.setY(event.getRawY() + initialY)
                            let deltaTime = Date.now() - initialTouchTime
                            if (deltaTime > 200) isMove = true
                            break
                        default:
                            return false
                    }
                    return true
                }
            }
        })
        this.#mainLayout.setOnTouchListener(MainLayoutOnTouchListener.$new())
    }

    start() {
        this.#drawContentView()
        this.#drawMainLayout()
        this.#drawMenuStart()
        this.#drawMenuBarLayout()
        this.#drawMenuBarTitle()
        this.#drawMenuOptions()
        this.#createMainLayoutEvent()
    }

}




Java.perform(async function () {
    const classLoader = getClassLoader()
    const mainActivity = await waitForMainActivity(classLoader);
    Java.scheduleOnMainThread(function () {
        const menu = new Menu(classLoader, mainActivity)
        menu.createMenuStart("Dan", 15, "#006400")
        menu.createMenuLayout("#18122B", 180)
        menu.createMenuBarLayout("#635985")
        menu.createMenuBarTitle("DanFunc", "#FFC107")
        menu.createMenuOptionsLayout()

        menu.addOption("opt1", "Btn1", () => {})

        menu.addSeekBar(1,"Value:",0, 0, 23, () => {})

        let radioGroup = menu.createRadioGroup();

        menu.addRadioButton("option1", "Option 1", radioGroup, { onClick: () => console.log("Option 1 selected") });
        menu.addRadioButton("option2", "Option 2", radioGroup, { onClick: () => console.log("Option 2 selected") });
        menu.addRadioButton("option3", "Option 3", radioGroup, { onClick: () => console.log("Option 3 selected") });


        let text1 = menu.addText("Hi!", 15, "#75757B")

        menu.addButton("opt2", "Tap! Tap!", {onClick: () => {menu.changeText(text1, "Bye!")}}, 0, 100)

        menu.addTextInput("userInput", "Enter your text here", {
            onTextChanged: (s, start, before, count) => console.log("Text changed: " + s.toString()),
        });

        menu.addToggle(1, "Toggle", false, {
            onToggleChange: (isChecked) => {
                console.log("Toggle is now: " + (isChecked ? "ON" : "OFF"));
            }
        });

        const options = ["Option 1", "Option 2", "Option 3"];
        const initialSelection = 0;

        menu.addDropdown("myDropdown", options, initialSelection, {
            onItemSelected: (position) => {
                console.log("Selected option: " + options[position]);
            }
        });

        menu.addDestroyButton()

        menu.start()
    })
})