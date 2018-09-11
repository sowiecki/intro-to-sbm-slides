import React, { PureComponent } from "react";
import CodeSlide from "spectacle-code-slide";
import { Notes, Deck, Heading, ListItem, List, Slide, Text } from "spectacle";
import createTheme from "spectacle/lib/themes/default";

import Comparison from "./comparison";
import pwm from "../assets/pwm.png";
import ledBlinkExample from "../assets/led-blink-example.gif";
import pullup from "../assets/pullup.png";
import pulldown from "../assets/pulldown.png";
import unoPinout from "../assets/uno-pinout.png";

import "normalize.css";
import "../assets/monokai.css";
import "./styles.css";

const theme = createTheme(
  {
    primary: "#1F2022",
    secondary: "white",
    tertiary: "#05a8fa",
    quarternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

/**
 * TODO
 * - Identify audience
 * - ESP8266?
 * - Hardware vs software solutions (pull-up resistors)
 * - Shields and Hats?
 */

class Presentation extends PureComponent {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <Slide className="intro" transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Single-Board Microcontrollers
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Introduction to the Arduino Platform
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            Quick comparison
          </Heading>
          <Comparison leftHeading="Raspberry Pi" rightHeading="Arduino">
            <List>
              <ListItem>
                Linux, Android, or Windows 10 operating system
              </ListItem>
              <ListItem>Any language</ListItem>
              <ListItem>5v logic only</ListItem>
              <ListItem>Digital only</ListItem>
            </List>
            <List>
              <ListItem>Compiled C++ firmware</ListItem>
              <ListItem>5v and 3.3v variants</ListItem>
              <ListItem>Digital & Analog (for input only)</ListItem>
            </List>
          </Comparison>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary">
          <Notes>
            <ul>
              <li>AVR - Pins as they correspond to the ATmega328P chip</li>
              <li>SPI - Serial Peripheral Interface</li>
              <li>I²C - Inter-Integrated Circuit </li>
            </ul>
          </Notes>
          <Heading size={5} textColor="primary" caps>
            Arduino UNO R3 Pinout
          </Heading>
          <img src={unoPinout} style={{ maxHeight: "600px" }} />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Digital
          </Heading>
          <List>
            <ListItem textColor="tertiary">
              On state (pin voltage set to HIGH)
            </ListItem>
            <ListItem textColor="tertiary">
              Off state (pin voltage set to LOW)
            </ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Analog
          </Heading>
          <ListItem textColor="tertiary">
            Not limited to binary signals (HIGH or LOW) like Digital
          </ListItem>
          <ListItem textColor="tertiary">
            analogRead() converts analog inputs to digital readings (0 to 1023)
          </ListItem>
          <ListItem textColor="tertiary">
            analogWrite() outputs PWM signals!
          </ListItem>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            PWM
          </Heading>
          <Heading size={6} textColor="secondary" caps>
            (Pulse-Width Modulation)
          </Heading>
          <img className="white" src={pwm} />
          <Text>
            <a
              target="_blank"
              className="attribution"
              href="https://en.wikipedia.org/wiki/Pulse-width_modulation#/media/File:PWM,_3-level.svg"
            >
              Wikipedia
            </a>
          </Text>
          <Text textColor="tertiary">
            A digital signal that can simulate an analog signal
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary">
          <Heading size={3} textColor="primary" caps>
            Pull-Up and Pull-Down Resistors
          </Heading>
          <img className="white" src={pullup} />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <img className="white" src={pulldown} />
          <br />
          <a
            target="_blank"
            className="attribution"
            href="https://playground.arduino.cc/CommonTopics/PullUpDownResistor"
          >
            https://playground.arduino.cc/CommonTopics/PullUpDownResistor
          </a>
          <Text className="text">
            Pulls a pin's voltage up (towards VIN) or down (towards ground) to
            prevent random floating input values.
            <br />
            <br />
            The ATMega chip has internal 20k pull-up resistors that can be
            activated by setting setting <code>pingMode(x, INPUT_PULLUP);</code>
            .
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary">
          <Heading size={5} textColor="primary" caps>
            Uploading Code
          </Heading>
          <ListItem textColor="tertiary">Arduino IDE</ListItem>
          <ListItem textColor="tertiary">Fritzring App</ListItem>
          <ListItem textColor="tertiary">
            Extensions for popular IDEs such as VSCode
          </ListItem>
          <Text className="text">
            Select the correct <span className="cyan">board type</span>,{" "}
            <span className="magenta">serial port</span>, and{" "}
            <span className="yellow">upload speed</span>. Most other settings
            can be left at their default values. Some boards require loading 3rd
            party configurations into the board manager.
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary">
          <Heading size={3} textColor="primary" caps>
            LED Blink Wiring
          </Heading>
          <img src={ledBlinkExample} />
        </Slide>

        <CodeSlide
          transition={["fade"]}
          className="code-slide"
          lang="c"
          code={require("raw-loader!../assets/arduino.example")}
          ranges={[
            {
              loc: [0, 12],
              title: <div className="code-title">Native Blink Sketch</div>
            },
            {
              loc: [0, 1],
              title: (
                <div className="code-note">
                  Instructs compiler to replace all instances of `LED_PIN` with
                  `13`. More memory efficient than a variable declaration.
                </div>
              )
            },
            {
              loc: [2, 5],
              title: (
                <div className="code-note">
                  The setup function runs once when you press reset or power the
                  board
                </div>
              )
            },
            {
              loc: [6, 12],
              title: (
                <div className="code-note">
                  The loop function runs over and over again forever
                </div>
              )
            }
          ]}
        />

        <CodeSlide
          transition={["fade"]}
          className="code-slide"
          lang="c"
          code={require("raw-loader!../assets/serial.example")}
          ranges={[
            {
              loc: [0, 9],
              title: (
                <div className="code-title">Serial Monitoring (Logging)</div>
              )
            },
            {
              loc: [1, 2],
              title: (
                <div className="code-note">
                  Instructs firmware to set serial output baud rate to 9600
                </div>
              )
            },
            {
              loc: [5, 7],
              title: <div className="code-note">Only prints strings!</div>
            },
            {
              loc: [0, 9],
              title: (
                <div className="code-note">
                  Arduino IDE > Tools > Serial Monitor Match the monitor's baud
                  rate to your firmware's rate
                </div>
              )
            }
          ]}
        />

        <CodeSlide
          transition={["fade"]}
          className="code-slide"
          lang="c"
          code={require("raw-loader!../assets/advanced.example")}
          ranges={[
            {
              loc: [0, 16],
              title: <div className="code-title">Advanced Sketch</div>
            },
            {
              loc: [17, 27],
              title: (
                <div className="code-note">
                  Initialize buttons, switch, servo, temp sensor, and serial
                </div>
              )
            },
            {
              loc: [29, 35],
              title: (
                <div className="code-note">
                  If switched ON, control servo position from button presses;
                  else, control from temperature reading
                </div>
              )
            },
            {
              loc: [38, 49],
              title: (
                <div className="code-note">
                  Rescale temperature reading to servo motor position, move
                  servo
                </div>
              )
            },
            {
              loc: [50, 65],
              title: (
                <div className="code-note">
                  Read button position, move servo if pressed
                </div>
              )
            }
          ]}
        />

        <CodeSlide
          transition={["fade"]}
          className="code-slide"
          lang="javascript"
          code={require("raw-loader!../assets/johnny-five.example")}
          ranges={[
            {
              loc: [0, 10],
              title: <div className="code-title">Johnny-Five Blink Sketch</div>
            },
            {
              loc: [5, 10],
              title: (
                <div className="code-note">
                  Once board is ready, run callback (asyncronous)
                </div>
              )
            },
            {
              loc: [6, 7],
              title: (
                <div className="code-note">
                  Create a standard LED component instance
                </div>
              )
            },
            {
              loc: [8, 9],
              title: (
                <div className="code-note">
                  Blink LED in 500ms on-off phase periods
                </div>
              )
            },
            {
              loc: [11, 17],
              title: (
                <div className="code-note">
                  Controlling Arduinos with other languanges over serial
                </div>
              )
            }
          ]}
        />

        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={5} textColor="secondary" caps>
            Where to Buy
          </Heading>
          <List>
            <ListItem>
              <a target="_blank" href="https://www.arrow.com/">
                Arrow
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://www.digikey.com/">
                Digi-Key
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://www.adafruit.com/">
                Adafruit
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://www.sparkfun.com/">
                Sparkfun
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://shop.pimoroni.com/">
                Pimoroni (UK)
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://thepihut.com/">
                The Pi Hut (UK)
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://thepihut.com/">
                Gearbest (Asia)
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://www.aliexpress.com/">
                AliExpress (Asia)
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://www.alibaba.com/">
                Alibaba (Asia)
              </a>
            </ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={5} textColor="secondary" caps>
            Resources
          </Heading>
          <List>
            <ListItem>
              <a target="_blank" href="https://www.arduino.cc/reference/en/">
                The Arduino Language documentation
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="http://fritzing.org/home/">
                Fritzing Software
              </a>
            </ListItem>
            <ListItem>
              <a target="_blank" href="https://learn.adafruit.com/">
                Adafruit Tutorials
              </a>
            </ListItem>
            <ListItem>
              <a
                target="_blank"
                href="https://learn.adafruit.com/adafruit-guide-excellent-soldering/tools"
              >
                Adafruit Soldering Guide
              </a>
            </ListItem>
            <ListItem>
              <a
                target="_blank"
                href="https://www.quora.com/How-led-brightness-is-controlled-by-pulse-width-modulation"
              >
                Quora - How led brightness is controlled by pulse width
                modulation?
              </a>
            </ListItem>
          </List>
        </Slide>
      </Deck>
    );
  }
}

export default Presentation;
