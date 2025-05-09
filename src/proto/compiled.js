/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.air20 = (function() {

    /**
     * Namespace air20.
     * @exports air20
     * @namespace
     */
    var air20 = {};

    air20.input = (function() {

        /**
         * Namespace input.
         * @memberof air20
         * @namespace
         */
        var input = {};

        input.AirInput = (function() {

            /**
             * Properties of an AirInput.
             * @memberof air20.input
             * @interface IAirInput
             * @property {string|null} [jobId] AirInput jobId
             * @property {air20.input.IAlgoConfig|null} [algoConfig] AirInput algoConfig
             * @property {Array.<air20.input.IVehicle>|null} [vehicles] AirInput vehicles
             * @property {Array.<air20.input.IDestination>|null} [destinations] AirInput destinations
             * @property {Object.<string,air20.input.IOd>|null} [od] AirInput od
             */

            /**
             * Constructs a new AirInput.
             * @memberof air20.input
             * @classdesc Represents an AirInput.
             * @implements IAirInput
             * @constructor
             * @param {air20.input.IAirInput=} [properties] Properties to set
             */
            function AirInput(properties) {
                this.vehicles = [];
                this.destinations = [];
                this.od = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AirInput jobId.
             * @member {string} jobId
             * @memberof air20.input.AirInput
             * @instance
             */
            AirInput.prototype.jobId = "";

            /**
             * AirInput algoConfig.
             * @member {air20.input.IAlgoConfig|null|undefined} algoConfig
             * @memberof air20.input.AirInput
             * @instance
             */
            AirInput.prototype.algoConfig = null;

            /**
             * AirInput vehicles.
             * @member {Array.<air20.input.IVehicle>} vehicles
             * @memberof air20.input.AirInput
             * @instance
             */
            AirInput.prototype.vehicles = $util.emptyArray;

            /**
             * AirInput destinations.
             * @member {Array.<air20.input.IDestination>} destinations
             * @memberof air20.input.AirInput
             * @instance
             */
            AirInput.prototype.destinations = $util.emptyArray;

            /**
             * AirInput od.
             * @member {Object.<string,air20.input.IOd>} od
             * @memberof air20.input.AirInput
             * @instance
             */
            AirInput.prototype.od = $util.emptyObject;

            /**
             * Creates a new AirInput instance using the specified properties.
             * @function create
             * @memberof air20.input.AirInput
             * @static
             * @param {air20.input.IAirInput=} [properties] Properties to set
             * @returns {air20.input.AirInput} AirInput instance
             */
            AirInput.create = function create(properties) {
                return new AirInput(properties);
            };

            /**
             * Encodes the specified AirInput message. Does not implicitly {@link air20.input.AirInput.verify|verify} messages.
             * @function encode
             * @memberof air20.input.AirInput
             * @static
             * @param {air20.input.IAirInput} message AirInput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirInput.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.jobId != null && Object.hasOwnProperty.call(message, "jobId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.jobId);
                if (message.algoConfig != null && Object.hasOwnProperty.call(message, "algoConfig"))
                    $root.air20.input.AlgoConfig.encode(message.algoConfig, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.vehicles != null && message.vehicles.length)
                    for (var i = 0; i < message.vehicles.length; ++i)
                        $root.air20.input.Vehicle.encode(message.vehicles[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.destinations != null && message.destinations.length)
                    for (var i = 0; i < message.destinations.length; ++i)
                        $root.air20.input.Destination.encode(message.destinations[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.od != null && Object.hasOwnProperty.call(message, "od"))
                    for (var keys = Object.keys(message.od), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 5, wireType 2 =*/42).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.air20.input.Od.encode(message.od[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified AirInput message, length delimited. Does not implicitly {@link air20.input.AirInput.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.AirInput
             * @static
             * @param {air20.input.IAirInput} message AirInput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirInput.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AirInput message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.AirInput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.AirInput} AirInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirInput.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.AirInput(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.jobId = reader.string();
                            break;
                        }
                    case 2: {
                            message.algoConfig = $root.air20.input.AlgoConfig.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            if (!(message.vehicles && message.vehicles.length))
                                message.vehicles = [];
                            message.vehicles.push($root.air20.input.Vehicle.decode(reader, reader.uint32()));
                            break;
                        }
                    case 4: {
                            if (!(message.destinations && message.destinations.length))
                                message.destinations = [];
                            message.destinations.push($root.air20.input.Destination.decode(reader, reader.uint32()));
                            break;
                        }
                    case 5: {
                            if (message.od === $util.emptyObject)
                                message.od = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = null;
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = $root.air20.input.Od.decode(reader, reader.uint32());
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.od[key] = value;
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AirInput message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.AirInput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.AirInput} AirInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirInput.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AirInput message.
             * @function verify
             * @memberof air20.input.AirInput
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AirInput.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.jobId != null && message.hasOwnProperty("jobId"))
                    if (!$util.isString(message.jobId))
                        return "jobId: string expected";
                if (message.algoConfig != null && message.hasOwnProperty("algoConfig")) {
                    var error = $root.air20.input.AlgoConfig.verify(message.algoConfig);
                    if (error)
                        return "algoConfig." + error;
                }
                if (message.vehicles != null && message.hasOwnProperty("vehicles")) {
                    if (!Array.isArray(message.vehicles))
                        return "vehicles: array expected";
                    for (var i = 0; i < message.vehicles.length; ++i) {
                        var error = $root.air20.input.Vehicle.verify(message.vehicles[i]);
                        if (error)
                            return "vehicles." + error;
                    }
                }
                if (message.destinations != null && message.hasOwnProperty("destinations")) {
                    if (!Array.isArray(message.destinations))
                        return "destinations: array expected";
                    for (var i = 0; i < message.destinations.length; ++i) {
                        var error = $root.air20.input.Destination.verify(message.destinations[i]);
                        if (error)
                            return "destinations." + error;
                    }
                }
                if (message.od != null && message.hasOwnProperty("od")) {
                    if (!$util.isObject(message.od))
                        return "od: object expected";
                    var key = Object.keys(message.od);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.air20.input.Od.verify(message.od[key[i]]);
                        if (error)
                            return "od." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an AirInput message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.AirInput
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.AirInput} AirInput
             */
            AirInput.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.AirInput)
                    return object;
                var message = new $root.air20.input.AirInput();
                if (object.jobId != null)
                    message.jobId = String(object.jobId);
                if (object.algoConfig != null) {
                    if (typeof object.algoConfig !== "object")
                        throw TypeError(".air20.input.AirInput.algoConfig: object expected");
                    message.algoConfig = $root.air20.input.AlgoConfig.fromObject(object.algoConfig);
                }
                if (object.vehicles) {
                    if (!Array.isArray(object.vehicles))
                        throw TypeError(".air20.input.AirInput.vehicles: array expected");
                    message.vehicles = [];
                    for (var i = 0; i < object.vehicles.length; ++i) {
                        if (typeof object.vehicles[i] !== "object")
                            throw TypeError(".air20.input.AirInput.vehicles: object expected");
                        message.vehicles[i] = $root.air20.input.Vehicle.fromObject(object.vehicles[i]);
                    }
                }
                if (object.destinations) {
                    if (!Array.isArray(object.destinations))
                        throw TypeError(".air20.input.AirInput.destinations: array expected");
                    message.destinations = [];
                    for (var i = 0; i < object.destinations.length; ++i) {
                        if (typeof object.destinations[i] !== "object")
                            throw TypeError(".air20.input.AirInput.destinations: object expected");
                        message.destinations[i] = $root.air20.input.Destination.fromObject(object.destinations[i]);
                    }
                }
                if (object.od) {
                    if (typeof object.od !== "object")
                        throw TypeError(".air20.input.AirInput.od: object expected");
                    message.od = {};
                    for (var keys = Object.keys(object.od), i = 0; i < keys.length; ++i) {
                        if (typeof object.od[keys[i]] !== "object")
                            throw TypeError(".air20.input.AirInput.od: object expected");
                        message.od[keys[i]] = $root.air20.input.Od.fromObject(object.od[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an AirInput message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.AirInput
             * @static
             * @param {air20.input.AirInput} message AirInput
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AirInput.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.vehicles = [];
                    object.destinations = [];
                }
                if (options.objects || options.defaults)
                    object.od = {};
                if (options.defaults) {
                    object.jobId = "";
                    object.algoConfig = null;
                }
                if (message.jobId != null && message.hasOwnProperty("jobId"))
                    object.jobId = message.jobId;
                if (message.algoConfig != null && message.hasOwnProperty("algoConfig"))
                    object.algoConfig = $root.air20.input.AlgoConfig.toObject(message.algoConfig, options);
                if (message.vehicles && message.vehicles.length) {
                    object.vehicles = [];
                    for (var j = 0; j < message.vehicles.length; ++j)
                        object.vehicles[j] = $root.air20.input.Vehicle.toObject(message.vehicles[j], options);
                }
                if (message.destinations && message.destinations.length) {
                    object.destinations = [];
                    for (var j = 0; j < message.destinations.length; ++j)
                        object.destinations[j] = $root.air20.input.Destination.toObject(message.destinations[j], options);
                }
                var keys2;
                if (message.od && (keys2 = Object.keys(message.od)).length) {
                    object.od = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.od[keys2[j]] = $root.air20.input.Od.toObject(message.od[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this AirInput to JSON.
             * @function toJSON
             * @memberof air20.input.AirInput
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AirInput.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AirInput
             * @function getTypeUrl
             * @memberof air20.input.AirInput
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AirInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.AirInput";
            };

            return AirInput;
        })();

        input.AlgoConfig = (function() {

            /**
             * Properties of an AlgoConfig.
             * @memberof air20.input
             * @interface IAlgoConfig
             * @property {string|null} [outputFormat] AlgoConfig outputFormat
             * @property {number|null} [maxSlack] AlgoConfig maxSlack
             * @property {number|null} [timeLimit] AlgoConfig timeLimit
             * @property {string|null} [globalObjectiveMode] AlgoConfig globalObjectiveMode
             * @property {string|null} [pickupDeliveryMode] AlgoConfig pickupDeliveryMode
             * @property {number|null} [firstSolutionStrategy] AlgoConfig firstSolutionStrategy
             * @property {number|null} [improvedSolutionStrategy] AlgoConfig improvedSolutionStrategy
             * @property {Array.<string>|null} [specificSolutionKeys] AlgoConfig specificSolutionKeys
             */

            /**
             * Constructs a new AlgoConfig.
             * @memberof air20.input
             * @classdesc Represents an AlgoConfig.
             * @implements IAlgoConfig
             * @constructor
             * @param {air20.input.IAlgoConfig=} [properties] Properties to set
             */
            function AlgoConfig(properties) {
                this.specificSolutionKeys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AlgoConfig outputFormat.
             * @member {string} outputFormat
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.outputFormat = "";

            /**
             * AlgoConfig maxSlack.
             * @member {number} maxSlack
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.maxSlack = 0;

            /**
             * AlgoConfig timeLimit.
             * @member {number} timeLimit
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.timeLimit = 0;

            /**
             * AlgoConfig globalObjectiveMode.
             * @member {string} globalObjectiveMode
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.globalObjectiveMode = "";

            /**
             * AlgoConfig pickupDeliveryMode.
             * @member {string} pickupDeliveryMode
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.pickupDeliveryMode = "";

            /**
             * AlgoConfig firstSolutionStrategy.
             * @member {number} firstSolutionStrategy
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.firstSolutionStrategy = 0;

            /**
             * AlgoConfig improvedSolutionStrategy.
             * @member {number} improvedSolutionStrategy
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.improvedSolutionStrategy = 0;

            /**
             * AlgoConfig specificSolutionKeys.
             * @member {Array.<string>} specificSolutionKeys
             * @memberof air20.input.AlgoConfig
             * @instance
             */
            AlgoConfig.prototype.specificSolutionKeys = $util.emptyArray;

            /**
             * Creates a new AlgoConfig instance using the specified properties.
             * @function create
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {air20.input.IAlgoConfig=} [properties] Properties to set
             * @returns {air20.input.AlgoConfig} AlgoConfig instance
             */
            AlgoConfig.create = function create(properties) {
                return new AlgoConfig(properties);
            };

            /**
             * Encodes the specified AlgoConfig message. Does not implicitly {@link air20.input.AlgoConfig.verify|verify} messages.
             * @function encode
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {air20.input.IAlgoConfig} message AlgoConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlgoConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.outputFormat != null && Object.hasOwnProperty.call(message, "outputFormat"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.outputFormat);
                if (message.maxSlack != null && Object.hasOwnProperty.call(message, "maxSlack"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.maxSlack);
                if (message.timeLimit != null && Object.hasOwnProperty.call(message, "timeLimit"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.timeLimit);
                if (message.globalObjectiveMode != null && Object.hasOwnProperty.call(message, "globalObjectiveMode"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.globalObjectiveMode);
                if (message.pickupDeliveryMode != null && Object.hasOwnProperty.call(message, "pickupDeliveryMode"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.pickupDeliveryMode);
                if (message.firstSolutionStrategy != null && Object.hasOwnProperty.call(message, "firstSolutionStrategy"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.firstSolutionStrategy);
                if (message.improvedSolutionStrategy != null && Object.hasOwnProperty.call(message, "improvedSolutionStrategy"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.improvedSolutionStrategy);
                if (message.specificSolutionKeys != null && message.specificSolutionKeys.length)
                    for (var i = 0; i < message.specificSolutionKeys.length; ++i)
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.specificSolutionKeys[i]);
                return writer;
            };

            /**
             * Encodes the specified AlgoConfig message, length delimited. Does not implicitly {@link air20.input.AlgoConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {air20.input.IAlgoConfig} message AlgoConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AlgoConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AlgoConfig message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.AlgoConfig} AlgoConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlgoConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.AlgoConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.outputFormat = reader.string();
                            break;
                        }
                    case 2: {
                            message.maxSlack = reader.int32();
                            break;
                        }
                    case 3: {
                            message.timeLimit = reader.int32();
                            break;
                        }
                    case 4: {
                            message.globalObjectiveMode = reader.string();
                            break;
                        }
                    case 5: {
                            message.pickupDeliveryMode = reader.string();
                            break;
                        }
                    case 6: {
                            message.firstSolutionStrategy = reader.int32();
                            break;
                        }
                    case 7: {
                            message.improvedSolutionStrategy = reader.int32();
                            break;
                        }
                    case 8: {
                            if (!(message.specificSolutionKeys && message.specificSolutionKeys.length))
                                message.specificSolutionKeys = [];
                            message.specificSolutionKeys.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AlgoConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.AlgoConfig} AlgoConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AlgoConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AlgoConfig message.
             * @function verify
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AlgoConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.outputFormat != null && message.hasOwnProperty("outputFormat"))
                    if (!$util.isString(message.outputFormat))
                        return "outputFormat: string expected";
                if (message.maxSlack != null && message.hasOwnProperty("maxSlack"))
                    if (!$util.isInteger(message.maxSlack))
                        return "maxSlack: integer expected";
                if (message.timeLimit != null && message.hasOwnProperty("timeLimit"))
                    if (!$util.isInteger(message.timeLimit))
                        return "timeLimit: integer expected";
                if (message.globalObjectiveMode != null && message.hasOwnProperty("globalObjectiveMode"))
                    if (!$util.isString(message.globalObjectiveMode))
                        return "globalObjectiveMode: string expected";
                if (message.pickupDeliveryMode != null && message.hasOwnProperty("pickupDeliveryMode"))
                    if (!$util.isString(message.pickupDeliveryMode))
                        return "pickupDeliveryMode: string expected";
                if (message.firstSolutionStrategy != null && message.hasOwnProperty("firstSolutionStrategy"))
                    if (!$util.isInteger(message.firstSolutionStrategy))
                        return "firstSolutionStrategy: integer expected";
                if (message.improvedSolutionStrategy != null && message.hasOwnProperty("improvedSolutionStrategy"))
                    if (!$util.isInteger(message.improvedSolutionStrategy))
                        return "improvedSolutionStrategy: integer expected";
                if (message.specificSolutionKeys != null && message.hasOwnProperty("specificSolutionKeys")) {
                    if (!Array.isArray(message.specificSolutionKeys))
                        return "specificSolutionKeys: array expected";
                    for (var i = 0; i < message.specificSolutionKeys.length; ++i)
                        if (!$util.isString(message.specificSolutionKeys[i]))
                            return "specificSolutionKeys: string[] expected";
                }
                return null;
            };

            /**
             * Creates an AlgoConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.AlgoConfig} AlgoConfig
             */
            AlgoConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.AlgoConfig)
                    return object;
                var message = new $root.air20.input.AlgoConfig();
                if (object.outputFormat != null)
                    message.outputFormat = String(object.outputFormat);
                if (object.maxSlack != null)
                    message.maxSlack = object.maxSlack | 0;
                if (object.timeLimit != null)
                    message.timeLimit = object.timeLimit | 0;
                if (object.globalObjectiveMode != null)
                    message.globalObjectiveMode = String(object.globalObjectiveMode);
                if (object.pickupDeliveryMode != null)
                    message.pickupDeliveryMode = String(object.pickupDeliveryMode);
                if (object.firstSolutionStrategy != null)
                    message.firstSolutionStrategy = object.firstSolutionStrategy | 0;
                if (object.improvedSolutionStrategy != null)
                    message.improvedSolutionStrategy = object.improvedSolutionStrategy | 0;
                if (object.specificSolutionKeys) {
                    if (!Array.isArray(object.specificSolutionKeys))
                        throw TypeError(".air20.input.AlgoConfig.specificSolutionKeys: array expected");
                    message.specificSolutionKeys = [];
                    for (var i = 0; i < object.specificSolutionKeys.length; ++i)
                        message.specificSolutionKeys[i] = String(object.specificSolutionKeys[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from an AlgoConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {air20.input.AlgoConfig} message AlgoConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AlgoConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.specificSolutionKeys = [];
                if (options.defaults) {
                    object.outputFormat = "";
                    object.maxSlack = 0;
                    object.timeLimit = 0;
                    object.globalObjectiveMode = "";
                    object.pickupDeliveryMode = "";
                    object.firstSolutionStrategy = 0;
                    object.improvedSolutionStrategy = 0;
                }
                if (message.outputFormat != null && message.hasOwnProperty("outputFormat"))
                    object.outputFormat = message.outputFormat;
                if (message.maxSlack != null && message.hasOwnProperty("maxSlack"))
                    object.maxSlack = message.maxSlack;
                if (message.timeLimit != null && message.hasOwnProperty("timeLimit"))
                    object.timeLimit = message.timeLimit;
                if (message.globalObjectiveMode != null && message.hasOwnProperty("globalObjectiveMode"))
                    object.globalObjectiveMode = message.globalObjectiveMode;
                if (message.pickupDeliveryMode != null && message.hasOwnProperty("pickupDeliveryMode"))
                    object.pickupDeliveryMode = message.pickupDeliveryMode;
                if (message.firstSolutionStrategy != null && message.hasOwnProperty("firstSolutionStrategy"))
                    object.firstSolutionStrategy = message.firstSolutionStrategy;
                if (message.improvedSolutionStrategy != null && message.hasOwnProperty("improvedSolutionStrategy"))
                    object.improvedSolutionStrategy = message.improvedSolutionStrategy;
                if (message.specificSolutionKeys && message.specificSolutionKeys.length) {
                    object.specificSolutionKeys = [];
                    for (var j = 0; j < message.specificSolutionKeys.length; ++j)
                        object.specificSolutionKeys[j] = message.specificSolutionKeys[j];
                }
                return object;
            };

            /**
             * Converts this AlgoConfig to JSON.
             * @function toJSON
             * @memberof air20.input.AlgoConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AlgoConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AlgoConfig
             * @function getTypeUrl
             * @memberof air20.input.AlgoConfig
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AlgoConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.AlgoConfig";
            };

            return AlgoConfig;
        })();

        input.Vehicle = (function() {

            /**
             * Properties of a Vehicle.
             * @memberof air20.input
             * @interface IVehicle
             * @property {string|null} [id] Vehicle id
             * @property {string|null} [type] Vehicle type
             * @property {number|null} [startTime] Vehicle startTime
             * @property {number|null} [endTime] Vehicle endTime
             * @property {Array.<string>|null} [startLocation] Vehicle startLocation
             * @property {Array.<string>|null} [endLocation] Vehicle endLocation
             * @property {boolean|null} [forceUse] Vehicle forceUse
             * @property {number|null} [priority] Vehicle priority
             * @property {boolean|null} [forceStart] Vehicle forceStart
             * @property {number|Long|null} [minCapacity] Vehicle minCapacity
             * @property {number|Long|null} [maxCapacity] Vehicle maxCapacity
             * @property {number|null} [minWorkTime] Vehicle minWorkTime
             * @property {number|null} [regularWorkTime] Vehicle regularWorkTime
             * @property {boolean|null} [considerOvertime] Vehicle considerOvertime
             * @property {number|null} [maxWorkOvertime] Vehicle maxWorkOvertime
             * @property {number|null} [minDrivingTime] Vehicle minDrivingTime
             * @property {number|null} [maxDrivingTime] Vehicle maxDrivingTime
             * @property {number|null} [minDrivingDistance] Vehicle minDrivingDistance
             * @property {number|null} [maxDrivingDistance] Vehicle maxDrivingDistance
             * @property {number|null} [minDestinationCount] Vehicle minDestinationCount
             * @property {number|null} [maxDestinationCount] Vehicle maxDestinationCount
             * @property {number|null} [startSetupTime] Vehicle startSetupTime
             * @property {number|null} [endSetupTime] Vehicle endSetupTime
             */

            /**
             * Constructs a new Vehicle.
             * @memberof air20.input
             * @classdesc Represents a Vehicle.
             * @implements IVehicle
             * @constructor
             * @param {air20.input.IVehicle=} [properties] Properties to set
             */
            function Vehicle(properties) {
                this.startLocation = [];
                this.endLocation = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Vehicle id.
             * @member {string} id
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.id = "";

            /**
             * Vehicle type.
             * @member {string} type
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.type = "";

            /**
             * Vehicle startTime.
             * @member {number} startTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.startTime = 0;

            /**
             * Vehicle endTime.
             * @member {number} endTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.endTime = 0;

            /**
             * Vehicle startLocation.
             * @member {Array.<string>} startLocation
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.startLocation = $util.emptyArray;

            /**
             * Vehicle endLocation.
             * @member {Array.<string>} endLocation
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.endLocation = $util.emptyArray;

            /**
             * Vehicle forceUse.
             * @member {boolean} forceUse
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.forceUse = false;

            /**
             * Vehicle priority.
             * @member {number} priority
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.priority = 0;

            /**
             * Vehicle forceStart.
             * @member {boolean} forceStart
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.forceStart = false;

            /**
             * Vehicle minCapacity.
             * @member {number|Long} minCapacity
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.minCapacity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Vehicle maxCapacity.
             * @member {number|Long} maxCapacity
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.maxCapacity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Vehicle minWorkTime.
             * @member {number} minWorkTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.minWorkTime = 0;

            /**
             * Vehicle regularWorkTime.
             * @member {number} regularWorkTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.regularWorkTime = 0;

            /**
             * Vehicle considerOvertime.
             * @member {boolean} considerOvertime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.considerOvertime = false;

            /**
             * Vehicle maxWorkOvertime.
             * @member {number} maxWorkOvertime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.maxWorkOvertime = 0;

            /**
             * Vehicle minDrivingTime.
             * @member {number} minDrivingTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.minDrivingTime = 0;

            /**
             * Vehicle maxDrivingTime.
             * @member {number} maxDrivingTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.maxDrivingTime = 0;

            /**
             * Vehicle minDrivingDistance.
             * @member {number} minDrivingDistance
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.minDrivingDistance = 0;

            /**
             * Vehicle maxDrivingDistance.
             * @member {number} maxDrivingDistance
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.maxDrivingDistance = 0;

            /**
             * Vehicle minDestinationCount.
             * @member {number} minDestinationCount
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.minDestinationCount = 0;

            /**
             * Vehicle maxDestinationCount.
             * @member {number} maxDestinationCount
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.maxDestinationCount = 0;

            /**
             * Vehicle startSetupTime.
             * @member {number} startSetupTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.startSetupTime = 0;

            /**
             * Vehicle endSetupTime.
             * @member {number} endSetupTime
             * @memberof air20.input.Vehicle
             * @instance
             */
            Vehicle.prototype.endSetupTime = 0;

            /**
             * Creates a new Vehicle instance using the specified properties.
             * @function create
             * @memberof air20.input.Vehicle
             * @static
             * @param {air20.input.IVehicle=} [properties] Properties to set
             * @returns {air20.input.Vehicle} Vehicle instance
             */
            Vehicle.create = function create(properties) {
                return new Vehicle(properties);
            };

            /**
             * Encodes the specified Vehicle message. Does not implicitly {@link air20.input.Vehicle.verify|verify} messages.
             * @function encode
             * @memberof air20.input.Vehicle
             * @static
             * @param {air20.input.IVehicle} message Vehicle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vehicle.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
                if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.startTime);
                if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.endTime);
                if (message.startLocation != null && message.startLocation.length)
                    for (var i = 0; i < message.startLocation.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.startLocation[i]);
                if (message.endLocation != null && message.endLocation.length)
                    for (var i = 0; i < message.endLocation.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.endLocation[i]);
                if (message.forceUse != null && Object.hasOwnProperty.call(message, "forceUse"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.forceUse);
                if (message.priority != null && Object.hasOwnProperty.call(message, "priority"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.priority);
                if (message.forceStart != null && Object.hasOwnProperty.call(message, "forceStart"))
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.forceStart);
                if (message.minCapacity != null && Object.hasOwnProperty.call(message, "minCapacity"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int64(message.minCapacity);
                if (message.maxCapacity != null && Object.hasOwnProperty.call(message, "maxCapacity"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int64(message.maxCapacity);
                if (message.minWorkTime != null && Object.hasOwnProperty.call(message, "minWorkTime"))
                    writer.uint32(/* id 12, wireType 0 =*/96).int32(message.minWorkTime);
                if (message.regularWorkTime != null && Object.hasOwnProperty.call(message, "regularWorkTime"))
                    writer.uint32(/* id 13, wireType 0 =*/104).int32(message.regularWorkTime);
                if (message.considerOvertime != null && Object.hasOwnProperty.call(message, "considerOvertime"))
                    writer.uint32(/* id 14, wireType 0 =*/112).bool(message.considerOvertime);
                if (message.maxWorkOvertime != null && Object.hasOwnProperty.call(message, "maxWorkOvertime"))
                    writer.uint32(/* id 15, wireType 0 =*/120).int32(message.maxWorkOvertime);
                if (message.minDrivingTime != null && Object.hasOwnProperty.call(message, "minDrivingTime"))
                    writer.uint32(/* id 16, wireType 0 =*/128).int32(message.minDrivingTime);
                if (message.maxDrivingTime != null && Object.hasOwnProperty.call(message, "maxDrivingTime"))
                    writer.uint32(/* id 17, wireType 0 =*/136).int32(message.maxDrivingTime);
                if (message.minDrivingDistance != null && Object.hasOwnProperty.call(message, "minDrivingDistance"))
                    writer.uint32(/* id 18, wireType 0 =*/144).int32(message.minDrivingDistance);
                if (message.maxDrivingDistance != null && Object.hasOwnProperty.call(message, "maxDrivingDistance"))
                    writer.uint32(/* id 19, wireType 0 =*/152).int32(message.maxDrivingDistance);
                if (message.minDestinationCount != null && Object.hasOwnProperty.call(message, "minDestinationCount"))
                    writer.uint32(/* id 20, wireType 0 =*/160).int32(message.minDestinationCount);
                if (message.maxDestinationCount != null && Object.hasOwnProperty.call(message, "maxDestinationCount"))
                    writer.uint32(/* id 21, wireType 0 =*/168).int32(message.maxDestinationCount);
                if (message.startSetupTime != null && Object.hasOwnProperty.call(message, "startSetupTime"))
                    writer.uint32(/* id 22, wireType 0 =*/176).int32(message.startSetupTime);
                if (message.endSetupTime != null && Object.hasOwnProperty.call(message, "endSetupTime"))
                    writer.uint32(/* id 23, wireType 0 =*/184).int32(message.endSetupTime);
                return writer;
            };

            /**
             * Encodes the specified Vehicle message, length delimited. Does not implicitly {@link air20.input.Vehicle.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.Vehicle
             * @static
             * @param {air20.input.IVehicle} message Vehicle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vehicle.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Vehicle message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.Vehicle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.Vehicle} Vehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vehicle.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.Vehicle();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.type = reader.string();
                            break;
                        }
                    case 3: {
                            message.startTime = reader.int32();
                            break;
                        }
                    case 4: {
                            message.endTime = reader.int32();
                            break;
                        }
                    case 5: {
                            if (!(message.startLocation && message.startLocation.length))
                                message.startLocation = [];
                            message.startLocation.push(reader.string());
                            break;
                        }
                    case 6: {
                            if (!(message.endLocation && message.endLocation.length))
                                message.endLocation = [];
                            message.endLocation.push(reader.string());
                            break;
                        }
                    case 7: {
                            message.forceUse = reader.bool();
                            break;
                        }
                    case 8: {
                            message.priority = reader.int32();
                            break;
                        }
                    case 9: {
                            message.forceStart = reader.bool();
                            break;
                        }
                    case 10: {
                            message.minCapacity = reader.int64();
                            break;
                        }
                    case 11: {
                            message.maxCapacity = reader.int64();
                            break;
                        }
                    case 12: {
                            message.minWorkTime = reader.int32();
                            break;
                        }
                    case 13: {
                            message.regularWorkTime = reader.int32();
                            break;
                        }
                    case 14: {
                            message.considerOvertime = reader.bool();
                            break;
                        }
                    case 15: {
                            message.maxWorkOvertime = reader.int32();
                            break;
                        }
                    case 16: {
                            message.minDrivingTime = reader.int32();
                            break;
                        }
                    case 17: {
                            message.maxDrivingTime = reader.int32();
                            break;
                        }
                    case 18: {
                            message.minDrivingDistance = reader.int32();
                            break;
                        }
                    case 19: {
                            message.maxDrivingDistance = reader.int32();
                            break;
                        }
                    case 20: {
                            message.minDestinationCount = reader.int32();
                            break;
                        }
                    case 21: {
                            message.maxDestinationCount = reader.int32();
                            break;
                        }
                    case 22: {
                            message.startSetupTime = reader.int32();
                            break;
                        }
                    case 23: {
                            message.endSetupTime = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Vehicle message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.Vehicle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.Vehicle} Vehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vehicle.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Vehicle message.
             * @function verify
             * @memberof air20.input.Vehicle
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Vehicle.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    if (!$util.isInteger(message.startTime))
                        return "startTime: integer expected";
                if (message.endTime != null && message.hasOwnProperty("endTime"))
                    if (!$util.isInteger(message.endTime))
                        return "endTime: integer expected";
                if (message.startLocation != null && message.hasOwnProperty("startLocation")) {
                    if (!Array.isArray(message.startLocation))
                        return "startLocation: array expected";
                    for (var i = 0; i < message.startLocation.length; ++i)
                        if (!$util.isString(message.startLocation[i]))
                            return "startLocation: string[] expected";
                }
                if (message.endLocation != null && message.hasOwnProperty("endLocation")) {
                    if (!Array.isArray(message.endLocation))
                        return "endLocation: array expected";
                    for (var i = 0; i < message.endLocation.length; ++i)
                        if (!$util.isString(message.endLocation[i]))
                            return "endLocation: string[] expected";
                }
                if (message.forceUse != null && message.hasOwnProperty("forceUse"))
                    if (typeof message.forceUse !== "boolean")
                        return "forceUse: boolean expected";
                if (message.priority != null && message.hasOwnProperty("priority"))
                    if (!$util.isInteger(message.priority))
                        return "priority: integer expected";
                if (message.forceStart != null && message.hasOwnProperty("forceStart"))
                    if (typeof message.forceStart !== "boolean")
                        return "forceStart: boolean expected";
                if (message.minCapacity != null && message.hasOwnProperty("minCapacity"))
                    if (!$util.isInteger(message.minCapacity) && !(message.minCapacity && $util.isInteger(message.minCapacity.low) && $util.isInteger(message.minCapacity.high)))
                        return "minCapacity: integer|Long expected";
                if (message.maxCapacity != null && message.hasOwnProperty("maxCapacity"))
                    if (!$util.isInteger(message.maxCapacity) && !(message.maxCapacity && $util.isInteger(message.maxCapacity.low) && $util.isInteger(message.maxCapacity.high)))
                        return "maxCapacity: integer|Long expected";
                if (message.minWorkTime != null && message.hasOwnProperty("minWorkTime"))
                    if (!$util.isInteger(message.minWorkTime))
                        return "minWorkTime: integer expected";
                if (message.regularWorkTime != null && message.hasOwnProperty("regularWorkTime"))
                    if (!$util.isInteger(message.regularWorkTime))
                        return "regularWorkTime: integer expected";
                if (message.considerOvertime != null && message.hasOwnProperty("considerOvertime"))
                    if (typeof message.considerOvertime !== "boolean")
                        return "considerOvertime: boolean expected";
                if (message.maxWorkOvertime != null && message.hasOwnProperty("maxWorkOvertime"))
                    if (!$util.isInteger(message.maxWorkOvertime))
                        return "maxWorkOvertime: integer expected";
                if (message.minDrivingTime != null && message.hasOwnProperty("minDrivingTime"))
                    if (!$util.isInteger(message.minDrivingTime))
                        return "minDrivingTime: integer expected";
                if (message.maxDrivingTime != null && message.hasOwnProperty("maxDrivingTime"))
                    if (!$util.isInteger(message.maxDrivingTime))
                        return "maxDrivingTime: integer expected";
                if (message.minDrivingDistance != null && message.hasOwnProperty("minDrivingDistance"))
                    if (!$util.isInteger(message.minDrivingDistance))
                        return "minDrivingDistance: integer expected";
                if (message.maxDrivingDistance != null && message.hasOwnProperty("maxDrivingDistance"))
                    if (!$util.isInteger(message.maxDrivingDistance))
                        return "maxDrivingDistance: integer expected";
                if (message.minDestinationCount != null && message.hasOwnProperty("minDestinationCount"))
                    if (!$util.isInteger(message.minDestinationCount))
                        return "minDestinationCount: integer expected";
                if (message.maxDestinationCount != null && message.hasOwnProperty("maxDestinationCount"))
                    if (!$util.isInteger(message.maxDestinationCount))
                        return "maxDestinationCount: integer expected";
                if (message.startSetupTime != null && message.hasOwnProperty("startSetupTime"))
                    if (!$util.isInteger(message.startSetupTime))
                        return "startSetupTime: integer expected";
                if (message.endSetupTime != null && message.hasOwnProperty("endSetupTime"))
                    if (!$util.isInteger(message.endSetupTime))
                        return "endSetupTime: integer expected";
                return null;
            };

            /**
             * Creates a Vehicle message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.Vehicle
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.Vehicle} Vehicle
             */
            Vehicle.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.Vehicle)
                    return object;
                var message = new $root.air20.input.Vehicle();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.type != null)
                    message.type = String(object.type);
                if (object.startTime != null)
                    message.startTime = object.startTime | 0;
                if (object.endTime != null)
                    message.endTime = object.endTime | 0;
                if (object.startLocation) {
                    if (!Array.isArray(object.startLocation))
                        throw TypeError(".air20.input.Vehicle.startLocation: array expected");
                    message.startLocation = [];
                    for (var i = 0; i < object.startLocation.length; ++i)
                        message.startLocation[i] = String(object.startLocation[i]);
                }
                if (object.endLocation) {
                    if (!Array.isArray(object.endLocation))
                        throw TypeError(".air20.input.Vehicle.endLocation: array expected");
                    message.endLocation = [];
                    for (var i = 0; i < object.endLocation.length; ++i)
                        message.endLocation[i] = String(object.endLocation[i]);
                }
                if (object.forceUse != null)
                    message.forceUse = Boolean(object.forceUse);
                if (object.priority != null)
                    message.priority = object.priority | 0;
                if (object.forceStart != null)
                    message.forceStart = Boolean(object.forceStart);
                if (object.minCapacity != null)
                    if ($util.Long)
                        (message.minCapacity = $util.Long.fromValue(object.minCapacity)).unsigned = false;
                    else if (typeof object.minCapacity === "string")
                        message.minCapacity = parseInt(object.minCapacity, 10);
                    else if (typeof object.minCapacity === "number")
                        message.minCapacity = object.minCapacity;
                    else if (typeof object.minCapacity === "object")
                        message.minCapacity = new $util.LongBits(object.minCapacity.low >>> 0, object.minCapacity.high >>> 0).toNumber();
                if (object.maxCapacity != null)
                    if ($util.Long)
                        (message.maxCapacity = $util.Long.fromValue(object.maxCapacity)).unsigned = false;
                    else if (typeof object.maxCapacity === "string")
                        message.maxCapacity = parseInt(object.maxCapacity, 10);
                    else if (typeof object.maxCapacity === "number")
                        message.maxCapacity = object.maxCapacity;
                    else if (typeof object.maxCapacity === "object")
                        message.maxCapacity = new $util.LongBits(object.maxCapacity.low >>> 0, object.maxCapacity.high >>> 0).toNumber();
                if (object.minWorkTime != null)
                    message.minWorkTime = object.minWorkTime | 0;
                if (object.regularWorkTime != null)
                    message.regularWorkTime = object.regularWorkTime | 0;
                if (object.considerOvertime != null)
                    message.considerOvertime = Boolean(object.considerOvertime);
                if (object.maxWorkOvertime != null)
                    message.maxWorkOvertime = object.maxWorkOvertime | 0;
                if (object.minDrivingTime != null)
                    message.minDrivingTime = object.minDrivingTime | 0;
                if (object.maxDrivingTime != null)
                    message.maxDrivingTime = object.maxDrivingTime | 0;
                if (object.minDrivingDistance != null)
                    message.minDrivingDistance = object.minDrivingDistance | 0;
                if (object.maxDrivingDistance != null)
                    message.maxDrivingDistance = object.maxDrivingDistance | 0;
                if (object.minDestinationCount != null)
                    message.minDestinationCount = object.minDestinationCount | 0;
                if (object.maxDestinationCount != null)
                    message.maxDestinationCount = object.maxDestinationCount | 0;
                if (object.startSetupTime != null)
                    message.startSetupTime = object.startSetupTime | 0;
                if (object.endSetupTime != null)
                    message.endSetupTime = object.endSetupTime | 0;
                return message;
            };

            /**
             * Creates a plain object from a Vehicle message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.Vehicle
             * @static
             * @param {air20.input.Vehicle} message Vehicle
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Vehicle.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.startLocation = [];
                    object.endLocation = [];
                }
                if (options.defaults) {
                    object.id = "";
                    object.type = "";
                    object.startTime = 0;
                    object.endTime = 0;
                    object.forceUse = false;
                    object.priority = 0;
                    object.forceStart = false;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.minCapacity = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.minCapacity = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.maxCapacity = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.maxCapacity = options.longs === String ? "0" : 0;
                    object.minWorkTime = 0;
                    object.regularWorkTime = 0;
                    object.considerOvertime = false;
                    object.maxWorkOvertime = 0;
                    object.minDrivingTime = 0;
                    object.maxDrivingTime = 0;
                    object.minDrivingDistance = 0;
                    object.maxDrivingDistance = 0;
                    object.minDestinationCount = 0;
                    object.maxDestinationCount = 0;
                    object.startSetupTime = 0;
                    object.endSetupTime = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    object.startTime = message.startTime;
                if (message.endTime != null && message.hasOwnProperty("endTime"))
                    object.endTime = message.endTime;
                if (message.startLocation && message.startLocation.length) {
                    object.startLocation = [];
                    for (var j = 0; j < message.startLocation.length; ++j)
                        object.startLocation[j] = message.startLocation[j];
                }
                if (message.endLocation && message.endLocation.length) {
                    object.endLocation = [];
                    for (var j = 0; j < message.endLocation.length; ++j)
                        object.endLocation[j] = message.endLocation[j];
                }
                if (message.forceUse != null && message.hasOwnProperty("forceUse"))
                    object.forceUse = message.forceUse;
                if (message.priority != null && message.hasOwnProperty("priority"))
                    object.priority = message.priority;
                if (message.forceStart != null && message.hasOwnProperty("forceStart"))
                    object.forceStart = message.forceStart;
                if (message.minCapacity != null && message.hasOwnProperty("minCapacity"))
                    if (typeof message.minCapacity === "number")
                        object.minCapacity = options.longs === String ? String(message.minCapacity) : message.minCapacity;
                    else
                        object.minCapacity = options.longs === String ? $util.Long.prototype.toString.call(message.minCapacity) : options.longs === Number ? new $util.LongBits(message.minCapacity.low >>> 0, message.minCapacity.high >>> 0).toNumber() : message.minCapacity;
                if (message.maxCapacity != null && message.hasOwnProperty("maxCapacity"))
                    if (typeof message.maxCapacity === "number")
                        object.maxCapacity = options.longs === String ? String(message.maxCapacity) : message.maxCapacity;
                    else
                        object.maxCapacity = options.longs === String ? $util.Long.prototype.toString.call(message.maxCapacity) : options.longs === Number ? new $util.LongBits(message.maxCapacity.low >>> 0, message.maxCapacity.high >>> 0).toNumber() : message.maxCapacity;
                if (message.minWorkTime != null && message.hasOwnProperty("minWorkTime"))
                    object.minWorkTime = message.minWorkTime;
                if (message.regularWorkTime != null && message.hasOwnProperty("regularWorkTime"))
                    object.regularWorkTime = message.regularWorkTime;
                if (message.considerOvertime != null && message.hasOwnProperty("considerOvertime"))
                    object.considerOvertime = message.considerOvertime;
                if (message.maxWorkOvertime != null && message.hasOwnProperty("maxWorkOvertime"))
                    object.maxWorkOvertime = message.maxWorkOvertime;
                if (message.minDrivingTime != null && message.hasOwnProperty("minDrivingTime"))
                    object.minDrivingTime = message.minDrivingTime;
                if (message.maxDrivingTime != null && message.hasOwnProperty("maxDrivingTime"))
                    object.maxDrivingTime = message.maxDrivingTime;
                if (message.minDrivingDistance != null && message.hasOwnProperty("minDrivingDistance"))
                    object.minDrivingDistance = message.minDrivingDistance;
                if (message.maxDrivingDistance != null && message.hasOwnProperty("maxDrivingDistance"))
                    object.maxDrivingDistance = message.maxDrivingDistance;
                if (message.minDestinationCount != null && message.hasOwnProperty("minDestinationCount"))
                    object.minDestinationCount = message.minDestinationCount;
                if (message.maxDestinationCount != null && message.hasOwnProperty("maxDestinationCount"))
                    object.maxDestinationCount = message.maxDestinationCount;
                if (message.startSetupTime != null && message.hasOwnProperty("startSetupTime"))
                    object.startSetupTime = message.startSetupTime;
                if (message.endSetupTime != null && message.hasOwnProperty("endSetupTime"))
                    object.endSetupTime = message.endSetupTime;
                return object;
            };

            /**
             * Converts this Vehicle to JSON.
             * @function toJSON
             * @memberof air20.input.Vehicle
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Vehicle.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Vehicle
             * @function getTypeUrl
             * @memberof air20.input.Vehicle
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Vehicle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.Vehicle";
            };

            return Vehicle;
        })();

        input.Destination = (function() {

            /**
             * Properties of a Destination.
             * @memberof air20.input
             * @interface IDestination
             * @property {string|null} [id] Destination id
             * @property {number|null} [type] Destination type
             * @property {string|null} [location] Destination location
             * @property {Array.<air20.input.IDemand>|null} [demand] Destination demand
             * @property {Array.<string>|null} [executeVehicles] Destination executeVehicles
             * @property {string|null} [serviceTimeMode] Destination serviceTimeMode
             * @property {number|null} [serviceTime] Destination serviceTime
             * @property {Object.<string,number>|null} [serviceTimeDependOnVehicle] Destination serviceTimeDependOnVehicle
             * @property {string|null} [arrivalMode] Destination arrivalMode
             * @property {number|null} [priority] Destination priority
             * @property {string|null} [timeWindowsMode] Destination timeWindowsMode
             * @property {Array.<air20.input.ITimeWindow>|null} [timeWindows] Destination timeWindows
             */

            /**
             * Constructs a new Destination.
             * @memberof air20.input
             * @classdesc Represents a Destination.
             * @implements IDestination
             * @constructor
             * @param {air20.input.IDestination=} [properties] Properties to set
             */
            function Destination(properties) {
                this.demand = [];
                this.executeVehicles = [];
                this.serviceTimeDependOnVehicle = {};
                this.timeWindows = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Destination id.
             * @member {string} id
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.id = "";

            /**
             * Destination type.
             * @member {number} type
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.type = 0;

            /**
             * Destination location.
             * @member {string} location
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.location = "";

            /**
             * Destination demand.
             * @member {Array.<air20.input.IDemand>} demand
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.demand = $util.emptyArray;

            /**
             * Destination executeVehicles.
             * @member {Array.<string>} executeVehicles
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.executeVehicles = $util.emptyArray;

            /**
             * Destination serviceTimeMode.
             * @member {string} serviceTimeMode
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.serviceTimeMode = "";

            /**
             * Destination serviceTime.
             * @member {number} serviceTime
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.serviceTime = 0;

            /**
             * Destination serviceTimeDependOnVehicle.
             * @member {Object.<string,number>} serviceTimeDependOnVehicle
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.serviceTimeDependOnVehicle = $util.emptyObject;

            /**
             * Destination arrivalMode.
             * @member {string} arrivalMode
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.arrivalMode = "";

            /**
             * Destination priority.
             * @member {number} priority
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.priority = 0;

            /**
             * Destination timeWindowsMode.
             * @member {string} timeWindowsMode
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.timeWindowsMode = "";

            /**
             * Destination timeWindows.
             * @member {Array.<air20.input.ITimeWindow>} timeWindows
             * @memberof air20.input.Destination
             * @instance
             */
            Destination.prototype.timeWindows = $util.emptyArray;

            /**
             * Creates a new Destination instance using the specified properties.
             * @function create
             * @memberof air20.input.Destination
             * @static
             * @param {air20.input.IDestination=} [properties] Properties to set
             * @returns {air20.input.Destination} Destination instance
             */
            Destination.create = function create(properties) {
                return new Destination(properties);
            };

            /**
             * Encodes the specified Destination message. Does not implicitly {@link air20.input.Destination.verify|verify} messages.
             * @function encode
             * @memberof air20.input.Destination
             * @static
             * @param {air20.input.IDestination} message Destination message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Destination.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                if (message.location != null && Object.hasOwnProperty.call(message, "location"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.location);
                if (message.demand != null && message.demand.length)
                    for (var i = 0; i < message.demand.length; ++i)
                        $root.air20.input.Demand.encode(message.demand[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.executeVehicles != null && message.executeVehicles.length)
                    for (var i = 0; i < message.executeVehicles.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.executeVehicles[i]);
                if (message.serviceTimeMode != null && Object.hasOwnProperty.call(message, "serviceTimeMode"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.serviceTimeMode);
                if (message.serviceTime != null && Object.hasOwnProperty.call(message, "serviceTime"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.serviceTime);
                if (message.serviceTimeDependOnVehicle != null && Object.hasOwnProperty.call(message, "serviceTimeDependOnVehicle"))
                    for (var keys = Object.keys(message.serviceTimeDependOnVehicle), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.serviceTimeDependOnVehicle[keys[i]]).ldelim();
                if (message.arrivalMode != null && Object.hasOwnProperty.call(message, "arrivalMode"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.arrivalMode);
                if (message.priority != null && Object.hasOwnProperty.call(message, "priority"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.priority);
                if (message.timeWindowsMode != null && Object.hasOwnProperty.call(message, "timeWindowsMode"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.timeWindowsMode);
                if (message.timeWindows != null && message.timeWindows.length)
                    for (var i = 0; i < message.timeWindows.length; ++i)
                        $root.air20.input.TimeWindow.encode(message.timeWindows[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Destination message, length delimited. Does not implicitly {@link air20.input.Destination.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.Destination
             * @static
             * @param {air20.input.IDestination} message Destination message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Destination.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Destination message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.Destination
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.Destination} Destination
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Destination.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.Destination(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.type = reader.int32();
                            break;
                        }
                    case 3: {
                            message.location = reader.string();
                            break;
                        }
                    case 4: {
                            if (!(message.demand && message.demand.length))
                                message.demand = [];
                            message.demand.push($root.air20.input.Demand.decode(reader, reader.uint32()));
                            break;
                        }
                    case 5: {
                            if (!(message.executeVehicles && message.executeVehicles.length))
                                message.executeVehicles = [];
                            message.executeVehicles.push(reader.string());
                            break;
                        }
                    case 6: {
                            message.serviceTimeMode = reader.string();
                            break;
                        }
                    case 7: {
                            message.serviceTime = reader.int32();
                            break;
                        }
                    case 8: {
                            if (message.serviceTimeDependOnVehicle === $util.emptyObject)
                                message.serviceTimeDependOnVehicle = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = 0;
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.int32();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.serviceTimeDependOnVehicle[key] = value;
                            break;
                        }
                    case 9: {
                            message.arrivalMode = reader.string();
                            break;
                        }
                    case 10: {
                            message.priority = reader.int32();
                            break;
                        }
                    case 11: {
                            message.timeWindowsMode = reader.string();
                            break;
                        }
                    case 12: {
                            if (!(message.timeWindows && message.timeWindows.length))
                                message.timeWindows = [];
                            message.timeWindows.push($root.air20.input.TimeWindow.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Destination message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.Destination
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.Destination} Destination
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Destination.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Destination message.
             * @function verify
             * @memberof air20.input.Destination
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Destination.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isInteger(message.type))
                        return "type: integer expected";
                if (message.location != null && message.hasOwnProperty("location"))
                    if (!$util.isString(message.location))
                        return "location: string expected";
                if (message.demand != null && message.hasOwnProperty("demand")) {
                    if (!Array.isArray(message.demand))
                        return "demand: array expected";
                    for (var i = 0; i < message.demand.length; ++i) {
                        var error = $root.air20.input.Demand.verify(message.demand[i]);
                        if (error)
                            return "demand." + error;
                    }
                }
                if (message.executeVehicles != null && message.hasOwnProperty("executeVehicles")) {
                    if (!Array.isArray(message.executeVehicles))
                        return "executeVehicles: array expected";
                    for (var i = 0; i < message.executeVehicles.length; ++i)
                        if (!$util.isString(message.executeVehicles[i]))
                            return "executeVehicles: string[] expected";
                }
                if (message.serviceTimeMode != null && message.hasOwnProperty("serviceTimeMode"))
                    if (!$util.isString(message.serviceTimeMode))
                        return "serviceTimeMode: string expected";
                if (message.serviceTime != null && message.hasOwnProperty("serviceTime"))
                    if (!$util.isInteger(message.serviceTime))
                        return "serviceTime: integer expected";
                if (message.serviceTimeDependOnVehicle != null && message.hasOwnProperty("serviceTimeDependOnVehicle")) {
                    if (!$util.isObject(message.serviceTimeDependOnVehicle))
                        return "serviceTimeDependOnVehicle: object expected";
                    var key = Object.keys(message.serviceTimeDependOnVehicle);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isInteger(message.serviceTimeDependOnVehicle[key[i]]))
                            return "serviceTimeDependOnVehicle: integer{k:string} expected";
                }
                if (message.arrivalMode != null && message.hasOwnProperty("arrivalMode"))
                    if (!$util.isString(message.arrivalMode))
                        return "arrivalMode: string expected";
                if (message.priority != null && message.hasOwnProperty("priority"))
                    if (!$util.isInteger(message.priority))
                        return "priority: integer expected";
                if (message.timeWindowsMode != null && message.hasOwnProperty("timeWindowsMode"))
                    if (!$util.isString(message.timeWindowsMode))
                        return "timeWindowsMode: string expected";
                if (message.timeWindows != null && message.hasOwnProperty("timeWindows")) {
                    if (!Array.isArray(message.timeWindows))
                        return "timeWindows: array expected";
                    for (var i = 0; i < message.timeWindows.length; ++i) {
                        var error = $root.air20.input.TimeWindow.verify(message.timeWindows[i]);
                        if (error)
                            return "timeWindows." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Destination message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.Destination
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.Destination} Destination
             */
            Destination.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.Destination)
                    return object;
                var message = new $root.air20.input.Destination();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.type != null)
                    message.type = object.type | 0;
                if (object.location != null)
                    message.location = String(object.location);
                if (object.demand) {
                    if (!Array.isArray(object.demand))
                        throw TypeError(".air20.input.Destination.demand: array expected");
                    message.demand = [];
                    for (var i = 0; i < object.demand.length; ++i) {
                        if (typeof object.demand[i] !== "object")
                            throw TypeError(".air20.input.Destination.demand: object expected");
                        message.demand[i] = $root.air20.input.Demand.fromObject(object.demand[i]);
                    }
                }
                if (object.executeVehicles) {
                    if (!Array.isArray(object.executeVehicles))
                        throw TypeError(".air20.input.Destination.executeVehicles: array expected");
                    message.executeVehicles = [];
                    for (var i = 0; i < object.executeVehicles.length; ++i)
                        message.executeVehicles[i] = String(object.executeVehicles[i]);
                }
                if (object.serviceTimeMode != null)
                    message.serviceTimeMode = String(object.serviceTimeMode);
                if (object.serviceTime != null)
                    message.serviceTime = object.serviceTime | 0;
                if (object.serviceTimeDependOnVehicle) {
                    if (typeof object.serviceTimeDependOnVehicle !== "object")
                        throw TypeError(".air20.input.Destination.serviceTimeDependOnVehicle: object expected");
                    message.serviceTimeDependOnVehicle = {};
                    for (var keys = Object.keys(object.serviceTimeDependOnVehicle), i = 0; i < keys.length; ++i)
                        message.serviceTimeDependOnVehicle[keys[i]] = object.serviceTimeDependOnVehicle[keys[i]] | 0;
                }
                if (object.arrivalMode != null)
                    message.arrivalMode = String(object.arrivalMode);
                if (object.priority != null)
                    message.priority = object.priority | 0;
                if (object.timeWindowsMode != null)
                    message.timeWindowsMode = String(object.timeWindowsMode);
                if (object.timeWindows) {
                    if (!Array.isArray(object.timeWindows))
                        throw TypeError(".air20.input.Destination.timeWindows: array expected");
                    message.timeWindows = [];
                    for (var i = 0; i < object.timeWindows.length; ++i) {
                        if (typeof object.timeWindows[i] !== "object")
                            throw TypeError(".air20.input.Destination.timeWindows: object expected");
                        message.timeWindows[i] = $root.air20.input.TimeWindow.fromObject(object.timeWindows[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Destination message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.Destination
             * @static
             * @param {air20.input.Destination} message Destination
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Destination.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.demand = [];
                    object.executeVehicles = [];
                    object.timeWindows = [];
                }
                if (options.objects || options.defaults)
                    object.serviceTimeDependOnVehicle = {};
                if (options.defaults) {
                    object.id = "";
                    object.type = 0;
                    object.location = "";
                    object.serviceTimeMode = "";
                    object.serviceTime = 0;
                    object.arrivalMode = "";
                    object.priority = 0;
                    object.timeWindowsMode = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = message.location;
                if (message.demand && message.demand.length) {
                    object.demand = [];
                    for (var j = 0; j < message.demand.length; ++j)
                        object.demand[j] = $root.air20.input.Demand.toObject(message.demand[j], options);
                }
                if (message.executeVehicles && message.executeVehicles.length) {
                    object.executeVehicles = [];
                    for (var j = 0; j < message.executeVehicles.length; ++j)
                        object.executeVehicles[j] = message.executeVehicles[j];
                }
                if (message.serviceTimeMode != null && message.hasOwnProperty("serviceTimeMode"))
                    object.serviceTimeMode = message.serviceTimeMode;
                if (message.serviceTime != null && message.hasOwnProperty("serviceTime"))
                    object.serviceTime = message.serviceTime;
                var keys2;
                if (message.serviceTimeDependOnVehicle && (keys2 = Object.keys(message.serviceTimeDependOnVehicle)).length) {
                    object.serviceTimeDependOnVehicle = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.serviceTimeDependOnVehicle[keys2[j]] = message.serviceTimeDependOnVehicle[keys2[j]];
                }
                if (message.arrivalMode != null && message.hasOwnProperty("arrivalMode"))
                    object.arrivalMode = message.arrivalMode;
                if (message.priority != null && message.hasOwnProperty("priority"))
                    object.priority = message.priority;
                if (message.timeWindowsMode != null && message.hasOwnProperty("timeWindowsMode"))
                    object.timeWindowsMode = message.timeWindowsMode;
                if (message.timeWindows && message.timeWindows.length) {
                    object.timeWindows = [];
                    for (var j = 0; j < message.timeWindows.length; ++j)
                        object.timeWindows[j] = $root.air20.input.TimeWindow.toObject(message.timeWindows[j], options);
                }
                return object;
            };

            /**
             * Converts this Destination to JSON.
             * @function toJSON
             * @memberof air20.input.Destination
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Destination.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Destination
             * @function getTypeUrl
             * @memberof air20.input.Destination
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Destination.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.Destination";
            };

            return Destination;
        })();

        input.Demand = (function() {

            /**
             * Properties of a Demand.
             * @memberof air20.input
             * @interface IDemand
             * @property {string|null} [type] Demand type
             * @property {number|Long|null} [quantity] Demand quantity
             * @property {Object.<string,string>|null} [info] Demand info
             */

            /**
             * Constructs a new Demand.
             * @memberof air20.input
             * @classdesc Represents a Demand.
             * @implements IDemand
             * @constructor
             * @param {air20.input.IDemand=} [properties] Properties to set
             */
            function Demand(properties) {
                this.info = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Demand type.
             * @member {string} type
             * @memberof air20.input.Demand
             * @instance
             */
            Demand.prototype.type = "";

            /**
             * Demand quantity.
             * @member {number|Long} quantity
             * @memberof air20.input.Demand
             * @instance
             */
            Demand.prototype.quantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Demand info.
             * @member {Object.<string,string>} info
             * @memberof air20.input.Demand
             * @instance
             */
            Demand.prototype.info = $util.emptyObject;

            /**
             * Creates a new Demand instance using the specified properties.
             * @function create
             * @memberof air20.input.Demand
             * @static
             * @param {air20.input.IDemand=} [properties] Properties to set
             * @returns {air20.input.Demand} Demand instance
             */
            Demand.create = function create(properties) {
                return new Demand(properties);
            };

            /**
             * Encodes the specified Demand message. Does not implicitly {@link air20.input.Demand.verify|verify} messages.
             * @function encode
             * @memberof air20.input.Demand
             * @static
             * @param {air20.input.IDemand} message Demand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Demand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
                if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.quantity);
                if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                    for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.info[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Demand message, length delimited. Does not implicitly {@link air20.input.Demand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.Demand
             * @static
             * @param {air20.input.IDemand} message Demand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Demand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Demand message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.Demand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.Demand} Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Demand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.Demand(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.string();
                            break;
                        }
                    case 2: {
                            message.quantity = reader.int64();
                            break;
                        }
                    case 3: {
                            if (message.info === $util.emptyObject)
                                message.info = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = "";
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.string();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.info[key] = value;
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Demand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.Demand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.Demand} Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Demand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Demand message.
             * @function verify
             * @memberof air20.input.Demand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Demand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.quantity != null && message.hasOwnProperty("quantity"))
                    if (!$util.isInteger(message.quantity) && !(message.quantity && $util.isInteger(message.quantity.low) && $util.isInteger(message.quantity.high)))
                        return "quantity: integer|Long expected";
                if (message.info != null && message.hasOwnProperty("info")) {
                    if (!$util.isObject(message.info))
                        return "info: object expected";
                    var key = Object.keys(message.info);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.info[key[i]]))
                            return "info: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a Demand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.Demand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.Demand} Demand
             */
            Demand.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.Demand)
                    return object;
                var message = new $root.air20.input.Demand();
                if (object.type != null)
                    message.type = String(object.type);
                if (object.quantity != null)
                    if ($util.Long)
                        (message.quantity = $util.Long.fromValue(object.quantity)).unsigned = false;
                    else if (typeof object.quantity === "string")
                        message.quantity = parseInt(object.quantity, 10);
                    else if (typeof object.quantity === "number")
                        message.quantity = object.quantity;
                    else if (typeof object.quantity === "object")
                        message.quantity = new $util.LongBits(object.quantity.low >>> 0, object.quantity.high >>> 0).toNumber();
                if (object.info) {
                    if (typeof object.info !== "object")
                        throw TypeError(".air20.input.Demand.info: object expected");
                    message.info = {};
                    for (var keys = Object.keys(object.info), i = 0; i < keys.length; ++i)
                        message.info[keys[i]] = String(object.info[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Demand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.Demand
             * @static
             * @param {air20.input.Demand} message Demand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Demand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.info = {};
                if (options.defaults) {
                    object.type = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.quantity = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.quantity = options.longs === String ? "0" : 0;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.quantity != null && message.hasOwnProperty("quantity"))
                    if (typeof message.quantity === "number")
                        object.quantity = options.longs === String ? String(message.quantity) : message.quantity;
                    else
                        object.quantity = options.longs === String ? $util.Long.prototype.toString.call(message.quantity) : options.longs === Number ? new $util.LongBits(message.quantity.low >>> 0, message.quantity.high >>> 0).toNumber() : message.quantity;
                var keys2;
                if (message.info && (keys2 = Object.keys(message.info)).length) {
                    object.info = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.info[keys2[j]] = message.info[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this Demand to JSON.
             * @function toJSON
             * @memberof air20.input.Demand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Demand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Demand
             * @function getTypeUrl
             * @memberof air20.input.Demand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Demand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.Demand";
            };

            return Demand;
        })();

        input.TimeWindow = (function() {

            /**
             * Properties of a TimeWindow.
             * @memberof air20.input
             * @interface ITimeWindow
             * @property {number|null} [start] TimeWindow start
             * @property {number|null} [end] TimeWindow end
             */

            /**
             * Constructs a new TimeWindow.
             * @memberof air20.input
             * @classdesc Represents a TimeWindow.
             * @implements ITimeWindow
             * @constructor
             * @param {air20.input.ITimeWindow=} [properties] Properties to set
             */
            function TimeWindow(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TimeWindow start.
             * @member {number} start
             * @memberof air20.input.TimeWindow
             * @instance
             */
            TimeWindow.prototype.start = 0;

            /**
             * TimeWindow end.
             * @member {number} end
             * @memberof air20.input.TimeWindow
             * @instance
             */
            TimeWindow.prototype.end = 0;

            /**
             * Creates a new TimeWindow instance using the specified properties.
             * @function create
             * @memberof air20.input.TimeWindow
             * @static
             * @param {air20.input.ITimeWindow=} [properties] Properties to set
             * @returns {air20.input.TimeWindow} TimeWindow instance
             */
            TimeWindow.create = function create(properties) {
                return new TimeWindow(properties);
            };

            /**
             * Encodes the specified TimeWindow message. Does not implicitly {@link air20.input.TimeWindow.verify|verify} messages.
             * @function encode
             * @memberof air20.input.TimeWindow
             * @static
             * @param {air20.input.ITimeWindow} message TimeWindow message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TimeWindow.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.start);
                if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.end);
                return writer;
            };

            /**
             * Encodes the specified TimeWindow message, length delimited. Does not implicitly {@link air20.input.TimeWindow.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.TimeWindow
             * @static
             * @param {air20.input.ITimeWindow} message TimeWindow message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TimeWindow.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TimeWindow message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.TimeWindow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.TimeWindow} TimeWindow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TimeWindow.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.TimeWindow();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.start = reader.int32();
                            break;
                        }
                    case 2: {
                            message.end = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TimeWindow message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.TimeWindow
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.TimeWindow} TimeWindow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TimeWindow.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TimeWindow message.
             * @function verify
             * @memberof air20.input.TimeWindow
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TimeWindow.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.start != null && message.hasOwnProperty("start"))
                    if (!$util.isInteger(message.start))
                        return "start: integer expected";
                if (message.end != null && message.hasOwnProperty("end"))
                    if (!$util.isInteger(message.end))
                        return "end: integer expected";
                return null;
            };

            /**
             * Creates a TimeWindow message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.TimeWindow
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.TimeWindow} TimeWindow
             */
            TimeWindow.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.TimeWindow)
                    return object;
                var message = new $root.air20.input.TimeWindow();
                if (object.start != null)
                    message.start = object.start | 0;
                if (object.end != null)
                    message.end = object.end | 0;
                return message;
            };

            /**
             * Creates a plain object from a TimeWindow message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.TimeWindow
             * @static
             * @param {air20.input.TimeWindow} message TimeWindow
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TimeWindow.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.start = 0;
                    object.end = 0;
                }
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = message.start;
                if (message.end != null && message.hasOwnProperty("end"))
                    object.end = message.end;
                return object;
            };

            /**
             * Converts this TimeWindow to JSON.
             * @function toJSON
             * @memberof air20.input.TimeWindow
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TimeWindow.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TimeWindow
             * @function getTypeUrl
             * @memberof air20.input.TimeWindow
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TimeWindow.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.TimeWindow";
            };

            return TimeWindow;
        })();

        input.Od = (function() {

            /**
             * Properties of an Od.
             * @memberof air20.input
             * @interface IOd
             * @property {Array.<number>|null} [truck] Od truck
             * @property {Array.<number>|null} [motorcycle] Od motorcycle
             */

            /**
             * Constructs a new Od.
             * @memberof air20.input
             * @classdesc Represents an Od.
             * @implements IOd
             * @constructor
             * @param {air20.input.IOd=} [properties] Properties to set
             */
            function Od(properties) {
                this.truck = [];
                this.motorcycle = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Od truck.
             * @member {Array.<number>} truck
             * @memberof air20.input.Od
             * @instance
             */
            Od.prototype.truck = $util.emptyArray;

            /**
             * Od motorcycle.
             * @member {Array.<number>} motorcycle
             * @memberof air20.input.Od
             * @instance
             */
            Od.prototype.motorcycle = $util.emptyArray;

            /**
             * Creates a new Od instance using the specified properties.
             * @function create
             * @memberof air20.input.Od
             * @static
             * @param {air20.input.IOd=} [properties] Properties to set
             * @returns {air20.input.Od} Od instance
             */
            Od.create = function create(properties) {
                return new Od(properties);
            };

            /**
             * Encodes the specified Od message. Does not implicitly {@link air20.input.Od.verify|verify} messages.
             * @function encode
             * @memberof air20.input.Od
             * @static
             * @param {air20.input.IOd} message Od message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Od.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.truck != null && message.truck.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (var i = 0; i < message.truck.length; ++i)
                        writer.int32(message.truck[i]);
                    writer.ldelim();
                }
                if (message.motorcycle != null && message.motorcycle.length) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork();
                    for (var i = 0; i < message.motorcycle.length; ++i)
                        writer.int32(message.motorcycle[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified Od message, length delimited. Does not implicitly {@link air20.input.Od.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.input.Od
             * @static
             * @param {air20.input.IOd} message Od message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Od.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Od message from the specified reader or buffer.
             * @function decode
             * @memberof air20.input.Od
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.input.Od} Od
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Od.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.input.Od();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.truck && message.truck.length))
                                message.truck = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.truck.push(reader.int32());
                            } else
                                message.truck.push(reader.int32());
                            break;
                        }
                    case 2: {
                            if (!(message.motorcycle && message.motorcycle.length))
                                message.motorcycle = [];
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2)
                                    message.motorcycle.push(reader.int32());
                            } else
                                message.motorcycle.push(reader.int32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Od message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.input.Od
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.input.Od} Od
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Od.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Od message.
             * @function verify
             * @memberof air20.input.Od
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Od.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.truck != null && message.hasOwnProperty("truck")) {
                    if (!Array.isArray(message.truck))
                        return "truck: array expected";
                    for (var i = 0; i < message.truck.length; ++i)
                        if (!$util.isInteger(message.truck[i]))
                            return "truck: integer[] expected";
                }
                if (message.motorcycle != null && message.hasOwnProperty("motorcycle")) {
                    if (!Array.isArray(message.motorcycle))
                        return "motorcycle: array expected";
                    for (var i = 0; i < message.motorcycle.length; ++i)
                        if (!$util.isInteger(message.motorcycle[i]))
                            return "motorcycle: integer[] expected";
                }
                return null;
            };

            /**
             * Creates an Od message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.input.Od
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.input.Od} Od
             */
            Od.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.input.Od)
                    return object;
                var message = new $root.air20.input.Od();
                if (object.truck) {
                    if (!Array.isArray(object.truck))
                        throw TypeError(".air20.input.Od.truck: array expected");
                    message.truck = [];
                    for (var i = 0; i < object.truck.length; ++i)
                        message.truck[i] = object.truck[i] | 0;
                }
                if (object.motorcycle) {
                    if (!Array.isArray(object.motorcycle))
                        throw TypeError(".air20.input.Od.motorcycle: array expected");
                    message.motorcycle = [];
                    for (var i = 0; i < object.motorcycle.length; ++i)
                        message.motorcycle[i] = object.motorcycle[i] | 0;
                }
                return message;
            };

            /**
             * Creates a plain object from an Od message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.input.Od
             * @static
             * @param {air20.input.Od} message Od
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Od.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.truck = [];
                    object.motorcycle = [];
                }
                if (message.truck && message.truck.length) {
                    object.truck = [];
                    for (var j = 0; j < message.truck.length; ++j)
                        object.truck[j] = message.truck[j];
                }
                if (message.motorcycle && message.motorcycle.length) {
                    object.motorcycle = [];
                    for (var j = 0; j < message.motorcycle.length; ++j)
                        object.motorcycle[j] = message.motorcycle[j];
                }
                return object;
            };

            /**
             * Converts this Od to JSON.
             * @function toJSON
             * @memberof air20.input.Od
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Od.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Od
             * @function getTypeUrl
             * @memberof air20.input.Od
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Od.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.input.Od";
            };

            return Od;
        })();

        return input;
    })();

    air20.output = (function() {

        /**
         * Namespace output.
         * @memberof air20
         * @namespace
         */
        var output = {};

        output.AirOutput = (function() {

            /**
             * Properties of an AirOutput.
             * @memberof air20.output
             * @interface IAirOutput
             * @property {string|null} [jobId] AirOutput jobId
             * @property {string|null} [status] AirOutput status
             * @property {string|null} [version] AirOutput version
             * @property {Object.<string,string>|null} [indicators] AirOutput indicators
             * @property {Array.<air20.output.IIdleVehicle>|null} [idleVehicles] AirOutput idleVehicles
             * @property {Array.<air20.output.IUnDispatch>|null} [unDispatches] AirOutput unDispatches
             * @property {Array.<air20.output.IAirRoute>|null} [routes] AirOutput routes
             * @property {air20.output.IModule|null} [module] AirOutput module
             * @property {Array.<air20.output.IError>|null} [errors] AirOutput errors
             */

            /**
             * Constructs a new AirOutput.
             * @memberof air20.output
             * @classdesc Represents an AirOutput.
             * @implements IAirOutput
             * @constructor
             * @param {air20.output.IAirOutput=} [properties] Properties to set
             */
            function AirOutput(properties) {
                this.indicators = {};
                this.idleVehicles = [];
                this.unDispatches = [];
                this.routes = [];
                this.errors = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AirOutput jobId.
             * @member {string} jobId
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.jobId = "";

            /**
             * AirOutput status.
             * @member {string} status
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.status = "";

            /**
             * AirOutput version.
             * @member {string} version
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.version = "";

            /**
             * AirOutput indicators.
             * @member {Object.<string,string>} indicators
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.indicators = $util.emptyObject;

            /**
             * AirOutput idleVehicles.
             * @member {Array.<air20.output.IIdleVehicle>} idleVehicles
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.idleVehicles = $util.emptyArray;

            /**
             * AirOutput unDispatches.
             * @member {Array.<air20.output.IUnDispatch>} unDispatches
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.unDispatches = $util.emptyArray;

            /**
             * AirOutput routes.
             * @member {Array.<air20.output.IAirRoute>} routes
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.routes = $util.emptyArray;

            /**
             * AirOutput module.
             * @member {air20.output.IModule|null|undefined} module
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.module = null;

            /**
             * AirOutput errors.
             * @member {Array.<air20.output.IError>} errors
             * @memberof air20.output.AirOutput
             * @instance
             */
            AirOutput.prototype.errors = $util.emptyArray;

            /**
             * Creates a new AirOutput instance using the specified properties.
             * @function create
             * @memberof air20.output.AirOutput
             * @static
             * @param {air20.output.IAirOutput=} [properties] Properties to set
             * @returns {air20.output.AirOutput} AirOutput instance
             */
            AirOutput.create = function create(properties) {
                return new AirOutput(properties);
            };

            /**
             * Encodes the specified AirOutput message. Does not implicitly {@link air20.output.AirOutput.verify|verify} messages.
             * @function encode
             * @memberof air20.output.AirOutput
             * @static
             * @param {air20.output.IAirOutput} message AirOutput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirOutput.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.jobId != null && Object.hasOwnProperty.call(message, "jobId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.jobId);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.status);
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
                if (message.indicators != null && Object.hasOwnProperty.call(message, "indicators"))
                    for (var keys = Object.keys(message.indicators), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.indicators[keys[i]]).ldelim();
                if (message.idleVehicles != null && message.idleVehicles.length)
                    for (var i = 0; i < message.idleVehicles.length; ++i)
                        $root.air20.output.IdleVehicle.encode(message.idleVehicles[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.unDispatches != null && message.unDispatches.length)
                    for (var i = 0; i < message.unDispatches.length; ++i)
                        $root.air20.output.UnDispatch.encode(message.unDispatches[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.routes != null && message.routes.length)
                    for (var i = 0; i < message.routes.length; ++i)
                        $root.air20.output.AirRoute.encode(message.routes[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                    $root.air20.output.Module.encode(message.module, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.errors != null && message.errors.length)
                    for (var i = 0; i < message.errors.length; ++i)
                        $root.air20.output.Error.encode(message.errors[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AirOutput message, length delimited. Does not implicitly {@link air20.output.AirOutput.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.AirOutput
             * @static
             * @param {air20.output.IAirOutput} message AirOutput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirOutput.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AirOutput message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.AirOutput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.AirOutput} AirOutput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirOutput.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.AirOutput(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.jobId = reader.string();
                            break;
                        }
                    case 2: {
                            message.status = reader.string();
                            break;
                        }
                    case 3: {
                            message.version = reader.string();
                            break;
                        }
                    case 4: {
                            if (message.indicators === $util.emptyObject)
                                message.indicators = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = "";
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.string();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.indicators[key] = value;
                            break;
                        }
                    case 5: {
                            if (!(message.idleVehicles && message.idleVehicles.length))
                                message.idleVehicles = [];
                            message.idleVehicles.push($root.air20.output.IdleVehicle.decode(reader, reader.uint32()));
                            break;
                        }
                    case 6: {
                            if (!(message.unDispatches && message.unDispatches.length))
                                message.unDispatches = [];
                            message.unDispatches.push($root.air20.output.UnDispatch.decode(reader, reader.uint32()));
                            break;
                        }
                    case 7: {
                            if (!(message.routes && message.routes.length))
                                message.routes = [];
                            message.routes.push($root.air20.output.AirRoute.decode(reader, reader.uint32()));
                            break;
                        }
                    case 8: {
                            message.module = $root.air20.output.Module.decode(reader, reader.uint32());
                            break;
                        }
                    case 9: {
                            if (!(message.errors && message.errors.length))
                                message.errors = [];
                            message.errors.push($root.air20.output.Error.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AirOutput message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.AirOutput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.AirOutput} AirOutput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirOutput.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AirOutput message.
             * @function verify
             * @memberof air20.output.AirOutput
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AirOutput.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.jobId != null && message.hasOwnProperty("jobId"))
                    if (!$util.isString(message.jobId))
                        return "jobId: string expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isString(message.status))
                        return "status: string expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.indicators != null && message.hasOwnProperty("indicators")) {
                    if (!$util.isObject(message.indicators))
                        return "indicators: object expected";
                    var key = Object.keys(message.indicators);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.indicators[key[i]]))
                            return "indicators: string{k:string} expected";
                }
                if (message.idleVehicles != null && message.hasOwnProperty("idleVehicles")) {
                    if (!Array.isArray(message.idleVehicles))
                        return "idleVehicles: array expected";
                    for (var i = 0; i < message.idleVehicles.length; ++i) {
                        var error = $root.air20.output.IdleVehicle.verify(message.idleVehicles[i]);
                        if (error)
                            return "idleVehicles." + error;
                    }
                }
                if (message.unDispatches != null && message.hasOwnProperty("unDispatches")) {
                    if (!Array.isArray(message.unDispatches))
                        return "unDispatches: array expected";
                    for (var i = 0; i < message.unDispatches.length; ++i) {
                        var error = $root.air20.output.UnDispatch.verify(message.unDispatches[i]);
                        if (error)
                            return "unDispatches." + error;
                    }
                }
                if (message.routes != null && message.hasOwnProperty("routes")) {
                    if (!Array.isArray(message.routes))
                        return "routes: array expected";
                    for (var i = 0; i < message.routes.length; ++i) {
                        var error = $root.air20.output.AirRoute.verify(message.routes[i]);
                        if (error)
                            return "routes." + error;
                    }
                }
                if (message.module != null && message.hasOwnProperty("module")) {
                    var error = $root.air20.output.Module.verify(message.module);
                    if (error)
                        return "module." + error;
                }
                if (message.errors != null && message.hasOwnProperty("errors")) {
                    if (!Array.isArray(message.errors))
                        return "errors: array expected";
                    for (var i = 0; i < message.errors.length; ++i) {
                        var error = $root.air20.output.Error.verify(message.errors[i]);
                        if (error)
                            return "errors." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an AirOutput message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.AirOutput
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.AirOutput} AirOutput
             */
            AirOutput.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.AirOutput)
                    return object;
                var message = new $root.air20.output.AirOutput();
                if (object.jobId != null)
                    message.jobId = String(object.jobId);
                if (object.status != null)
                    message.status = String(object.status);
                if (object.version != null)
                    message.version = String(object.version);
                if (object.indicators) {
                    if (typeof object.indicators !== "object")
                        throw TypeError(".air20.output.AirOutput.indicators: object expected");
                    message.indicators = {};
                    for (var keys = Object.keys(object.indicators), i = 0; i < keys.length; ++i)
                        message.indicators[keys[i]] = String(object.indicators[keys[i]]);
                }
                if (object.idleVehicles) {
                    if (!Array.isArray(object.idleVehicles))
                        throw TypeError(".air20.output.AirOutput.idleVehicles: array expected");
                    message.idleVehicles = [];
                    for (var i = 0; i < object.idleVehicles.length; ++i) {
                        if (typeof object.idleVehicles[i] !== "object")
                            throw TypeError(".air20.output.AirOutput.idleVehicles: object expected");
                        message.idleVehicles[i] = $root.air20.output.IdleVehicle.fromObject(object.idleVehicles[i]);
                    }
                }
                if (object.unDispatches) {
                    if (!Array.isArray(object.unDispatches))
                        throw TypeError(".air20.output.AirOutput.unDispatches: array expected");
                    message.unDispatches = [];
                    for (var i = 0; i < object.unDispatches.length; ++i) {
                        if (typeof object.unDispatches[i] !== "object")
                            throw TypeError(".air20.output.AirOutput.unDispatches: object expected");
                        message.unDispatches[i] = $root.air20.output.UnDispatch.fromObject(object.unDispatches[i]);
                    }
                }
                if (object.routes) {
                    if (!Array.isArray(object.routes))
                        throw TypeError(".air20.output.AirOutput.routes: array expected");
                    message.routes = [];
                    for (var i = 0; i < object.routes.length; ++i) {
                        if (typeof object.routes[i] !== "object")
                            throw TypeError(".air20.output.AirOutput.routes: object expected");
                        message.routes[i] = $root.air20.output.AirRoute.fromObject(object.routes[i]);
                    }
                }
                if (object.module != null) {
                    if (typeof object.module !== "object")
                        throw TypeError(".air20.output.AirOutput.module: object expected");
                    message.module = $root.air20.output.Module.fromObject(object.module);
                }
                if (object.errors) {
                    if (!Array.isArray(object.errors))
                        throw TypeError(".air20.output.AirOutput.errors: array expected");
                    message.errors = [];
                    for (var i = 0; i < object.errors.length; ++i) {
                        if (typeof object.errors[i] !== "object")
                            throw TypeError(".air20.output.AirOutput.errors: object expected");
                        message.errors[i] = $root.air20.output.Error.fromObject(object.errors[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an AirOutput message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.AirOutput
             * @static
             * @param {air20.output.AirOutput} message AirOutput
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AirOutput.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.idleVehicles = [];
                    object.unDispatches = [];
                    object.routes = [];
                    object.errors = [];
                }
                if (options.objects || options.defaults)
                    object.indicators = {};
                if (options.defaults) {
                    object.jobId = "";
                    object.status = "";
                    object.version = "";
                    object.module = null;
                }
                if (message.jobId != null && message.hasOwnProperty("jobId"))
                    object.jobId = message.jobId;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                var keys2;
                if (message.indicators && (keys2 = Object.keys(message.indicators)).length) {
                    object.indicators = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.indicators[keys2[j]] = message.indicators[keys2[j]];
                }
                if (message.idleVehicles && message.idleVehicles.length) {
                    object.idleVehicles = [];
                    for (var j = 0; j < message.idleVehicles.length; ++j)
                        object.idleVehicles[j] = $root.air20.output.IdleVehicle.toObject(message.idleVehicles[j], options);
                }
                if (message.unDispatches && message.unDispatches.length) {
                    object.unDispatches = [];
                    for (var j = 0; j < message.unDispatches.length; ++j)
                        object.unDispatches[j] = $root.air20.output.UnDispatch.toObject(message.unDispatches[j], options);
                }
                if (message.routes && message.routes.length) {
                    object.routes = [];
                    for (var j = 0; j < message.routes.length; ++j)
                        object.routes[j] = $root.air20.output.AirRoute.toObject(message.routes[j], options);
                }
                if (message.module != null && message.hasOwnProperty("module"))
                    object.module = $root.air20.output.Module.toObject(message.module, options);
                if (message.errors && message.errors.length) {
                    object.errors = [];
                    for (var j = 0; j < message.errors.length; ++j)
                        object.errors[j] = $root.air20.output.Error.toObject(message.errors[j], options);
                }
                return object;
            };

            /**
             * Converts this AirOutput to JSON.
             * @function toJSON
             * @memberof air20.output.AirOutput
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AirOutput.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AirOutput
             * @function getTypeUrl
             * @memberof air20.output.AirOutput
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AirOutput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.AirOutput";
            };

            return AirOutput;
        })();

        output.IdleVehicle = (function() {

            /**
             * Properties of an IdleVehicle.
             * @memberof air20.output
             * @interface IIdleVehicle
             * @property {string|null} [id] IdleVehicle id
             * @property {string|null} [reason] IdleVehicle reason
             * @property {string|null} [info] IdleVehicle info
             */

            /**
             * Constructs a new IdleVehicle.
             * @memberof air20.output
             * @classdesc Represents an IdleVehicle.
             * @implements IIdleVehicle
             * @constructor
             * @param {air20.output.IIdleVehicle=} [properties] Properties to set
             */
            function IdleVehicle(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * IdleVehicle id.
             * @member {string} id
             * @memberof air20.output.IdleVehicle
             * @instance
             */
            IdleVehicle.prototype.id = "";

            /**
             * IdleVehicle reason.
             * @member {string} reason
             * @memberof air20.output.IdleVehicle
             * @instance
             */
            IdleVehicle.prototype.reason = "";

            /**
             * IdleVehicle info.
             * @member {string} info
             * @memberof air20.output.IdleVehicle
             * @instance
             */
            IdleVehicle.prototype.info = "";

            /**
             * Creates a new IdleVehicle instance using the specified properties.
             * @function create
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {air20.output.IIdleVehicle=} [properties] Properties to set
             * @returns {air20.output.IdleVehicle} IdleVehicle instance
             */
            IdleVehicle.create = function create(properties) {
                return new IdleVehicle(properties);
            };

            /**
             * Encodes the specified IdleVehicle message. Does not implicitly {@link air20.output.IdleVehicle.verify|verify} messages.
             * @function encode
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {air20.output.IIdleVehicle} message IdleVehicle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IdleVehicle.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
                if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.info);
                return writer;
            };

            /**
             * Encodes the specified IdleVehicle message, length delimited. Does not implicitly {@link air20.output.IdleVehicle.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {air20.output.IIdleVehicle} message IdleVehicle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IdleVehicle.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an IdleVehicle message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.IdleVehicle} IdleVehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IdleVehicle.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.IdleVehicle();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.reason = reader.string();
                            break;
                        }
                    case 3: {
                            message.info = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an IdleVehicle message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.IdleVehicle} IdleVehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IdleVehicle.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an IdleVehicle message.
             * @function verify
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            IdleVehicle.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                if (message.info != null && message.hasOwnProperty("info"))
                    if (!$util.isString(message.info))
                        return "info: string expected";
                return null;
            };

            /**
             * Creates an IdleVehicle message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.IdleVehicle} IdleVehicle
             */
            IdleVehicle.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.IdleVehicle)
                    return object;
                var message = new $root.air20.output.IdleVehicle();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.reason != null)
                    message.reason = String(object.reason);
                if (object.info != null)
                    message.info = String(object.info);
                return message;
            };

            /**
             * Creates a plain object from an IdleVehicle message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {air20.output.IdleVehicle} message IdleVehicle
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            IdleVehicle.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = "";
                    object.reason = "";
                    object.info = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                if (message.info != null && message.hasOwnProperty("info"))
                    object.info = message.info;
                return object;
            };

            /**
             * Converts this IdleVehicle to JSON.
             * @function toJSON
             * @memberof air20.output.IdleVehicle
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            IdleVehicle.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for IdleVehicle
             * @function getTypeUrl
             * @memberof air20.output.IdleVehicle
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            IdleVehicle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.IdleVehicle";
            };

            return IdleVehicle;
        })();

        output.UnDispatch = (function() {

            /**
             * Properties of an UnDispatch.
             * @memberof air20.output
             * @interface IUnDispatch
             * @property {string|null} [id] UnDispatch id
             * @property {string|null} [reason] UnDispatch reason
             * @property {string|null} [info] UnDispatch info
             */

            /**
             * Constructs a new UnDispatch.
             * @memberof air20.output
             * @classdesc Represents an UnDispatch.
             * @implements IUnDispatch
             * @constructor
             * @param {air20.output.IUnDispatch=} [properties] Properties to set
             */
            function UnDispatch(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UnDispatch id.
             * @member {string} id
             * @memberof air20.output.UnDispatch
             * @instance
             */
            UnDispatch.prototype.id = "";

            /**
             * UnDispatch reason.
             * @member {string} reason
             * @memberof air20.output.UnDispatch
             * @instance
             */
            UnDispatch.prototype.reason = "";

            /**
             * UnDispatch info.
             * @member {string} info
             * @memberof air20.output.UnDispatch
             * @instance
             */
            UnDispatch.prototype.info = "";

            /**
             * Creates a new UnDispatch instance using the specified properties.
             * @function create
             * @memberof air20.output.UnDispatch
             * @static
             * @param {air20.output.IUnDispatch=} [properties] Properties to set
             * @returns {air20.output.UnDispatch} UnDispatch instance
             */
            UnDispatch.create = function create(properties) {
                return new UnDispatch(properties);
            };

            /**
             * Encodes the specified UnDispatch message. Does not implicitly {@link air20.output.UnDispatch.verify|verify} messages.
             * @function encode
             * @memberof air20.output.UnDispatch
             * @static
             * @param {air20.output.IUnDispatch} message UnDispatch message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnDispatch.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
                if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.info);
                return writer;
            };

            /**
             * Encodes the specified UnDispatch message, length delimited. Does not implicitly {@link air20.output.UnDispatch.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.UnDispatch
             * @static
             * @param {air20.output.IUnDispatch} message UnDispatch message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnDispatch.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UnDispatch message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.UnDispatch
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.UnDispatch} UnDispatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnDispatch.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.UnDispatch();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.reason = reader.string();
                            break;
                        }
                    case 3: {
                            message.info = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an UnDispatch message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.UnDispatch
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.UnDispatch} UnDispatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnDispatch.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an UnDispatch message.
             * @function verify
             * @memberof air20.output.UnDispatch
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UnDispatch.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                if (message.info != null && message.hasOwnProperty("info"))
                    if (!$util.isString(message.info))
                        return "info: string expected";
                return null;
            };

            /**
             * Creates an UnDispatch message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.UnDispatch
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.UnDispatch} UnDispatch
             */
            UnDispatch.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.UnDispatch)
                    return object;
                var message = new $root.air20.output.UnDispatch();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.reason != null)
                    message.reason = String(object.reason);
                if (object.info != null)
                    message.info = String(object.info);
                return message;
            };

            /**
             * Creates a plain object from an UnDispatch message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.UnDispatch
             * @static
             * @param {air20.output.UnDispatch} message UnDispatch
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnDispatch.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = "";
                    object.reason = "";
                    object.info = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                if (message.info != null && message.hasOwnProperty("info"))
                    object.info = message.info;
                return object;
            };

            /**
             * Converts this UnDispatch to JSON.
             * @function toJSON
             * @memberof air20.output.UnDispatch
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnDispatch.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for UnDispatch
             * @function getTypeUrl
             * @memberof air20.output.UnDispatch
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            UnDispatch.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.UnDispatch";
            };

            return UnDispatch;
        })();

        output.AirRoute = (function() {

            /**
             * Properties of an AirRoute.
             * @memberof air20.output
             * @interface IAirRoute
             * @property {string|null} [id] AirRoute id
             * @property {number|null} [startTime] AirRoute startTime
             * @property {number|null} [endTime] AirRoute endTime
             * @property {number|Long|null} [totalDeliveryDemand] AirRoute totalDeliveryDemand
             * @property {number|Long|null} [totalPickupDemand] AirRoute totalPickupDemand
             * @property {number|null} [totalDrivingTime] AirRoute totalDrivingTime
             * @property {number|null} [totalSlackTime] AirRoute totalSlackTime
             * @property {number|null} [totalServiceTime] AirRoute totalServiceTime
             * @property {number|null} [totalWorkTime] AirRoute totalWorkTime
             * @property {boolean|null} [isOvertime] AirRoute isOvertime
             * @property {number|null} [totalDrivingDistance] AirRoute totalDrivingDistance
             * @property {Array.<air20.output.IAirTask>|null} [tasks] AirRoute tasks
             */

            /**
             * Constructs a new AirRoute.
             * @memberof air20.output
             * @classdesc Represents an AirRoute.
             * @implements IAirRoute
             * @constructor
             * @param {air20.output.IAirRoute=} [properties] Properties to set
             */
            function AirRoute(properties) {
                this.tasks = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AirRoute id.
             * @member {string} id
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.id = "";

            /**
             * AirRoute startTime.
             * @member {number} startTime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.startTime = 0;

            /**
             * AirRoute endTime.
             * @member {number} endTime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.endTime = 0;

            /**
             * AirRoute totalDeliveryDemand.
             * @member {number|Long} totalDeliveryDemand
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalDeliveryDemand = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AirRoute totalPickupDemand.
             * @member {number|Long} totalPickupDemand
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalPickupDemand = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AirRoute totalDrivingTime.
             * @member {number} totalDrivingTime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalDrivingTime = 0;

            /**
             * AirRoute totalSlackTime.
             * @member {number} totalSlackTime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalSlackTime = 0;

            /**
             * AirRoute totalServiceTime.
             * @member {number} totalServiceTime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalServiceTime = 0;

            /**
             * AirRoute totalWorkTime.
             * @member {number} totalWorkTime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalWorkTime = 0;

            /**
             * AirRoute isOvertime.
             * @member {boolean} isOvertime
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.isOvertime = false;

            /**
             * AirRoute totalDrivingDistance.
             * @member {number} totalDrivingDistance
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.totalDrivingDistance = 0;

            /**
             * AirRoute tasks.
             * @member {Array.<air20.output.IAirTask>} tasks
             * @memberof air20.output.AirRoute
             * @instance
             */
            AirRoute.prototype.tasks = $util.emptyArray;

            /**
             * Creates a new AirRoute instance using the specified properties.
             * @function create
             * @memberof air20.output.AirRoute
             * @static
             * @param {air20.output.IAirRoute=} [properties] Properties to set
             * @returns {air20.output.AirRoute} AirRoute instance
             */
            AirRoute.create = function create(properties) {
                return new AirRoute(properties);
            };

            /**
             * Encodes the specified AirRoute message. Does not implicitly {@link air20.output.AirRoute.verify|verify} messages.
             * @function encode
             * @memberof air20.output.AirRoute
             * @static
             * @param {air20.output.IAirRoute} message AirRoute message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirRoute.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.startTime);
                if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.endTime);
                if (message.totalDeliveryDemand != null && Object.hasOwnProperty.call(message, "totalDeliveryDemand"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.totalDeliveryDemand);
                if (message.totalPickupDemand != null && Object.hasOwnProperty.call(message, "totalPickupDemand"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.totalPickupDemand);
                if (message.totalDrivingTime != null && Object.hasOwnProperty.call(message, "totalDrivingTime"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.totalDrivingTime);
                if (message.totalSlackTime != null && Object.hasOwnProperty.call(message, "totalSlackTime"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.totalSlackTime);
                if (message.totalServiceTime != null && Object.hasOwnProperty.call(message, "totalServiceTime"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.totalServiceTime);
                if (message.totalWorkTime != null && Object.hasOwnProperty.call(message, "totalWorkTime"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.totalWorkTime);
                if (message.isOvertime != null && Object.hasOwnProperty.call(message, "isOvertime"))
                    writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isOvertime);
                if (message.totalDrivingDistance != null && Object.hasOwnProperty.call(message, "totalDrivingDistance"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.totalDrivingDistance);
                if (message.tasks != null && message.tasks.length)
                    for (var i = 0; i < message.tasks.length; ++i)
                        $root.air20.output.AirTask.encode(message.tasks[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AirRoute message, length delimited. Does not implicitly {@link air20.output.AirRoute.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.AirRoute
             * @static
             * @param {air20.output.IAirRoute} message AirRoute message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirRoute.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AirRoute message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.AirRoute
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.AirRoute} AirRoute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirRoute.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.AirRoute();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.startTime = reader.int32();
                            break;
                        }
                    case 3: {
                            message.endTime = reader.int32();
                            break;
                        }
                    case 4: {
                            message.totalDeliveryDemand = reader.int64();
                            break;
                        }
                    case 5: {
                            message.totalPickupDemand = reader.int64();
                            break;
                        }
                    case 6: {
                            message.totalDrivingTime = reader.int32();
                            break;
                        }
                    case 7: {
                            message.totalSlackTime = reader.int32();
                            break;
                        }
                    case 8: {
                            message.totalServiceTime = reader.int32();
                            break;
                        }
                    case 9: {
                            message.totalWorkTime = reader.int32();
                            break;
                        }
                    case 10: {
                            message.isOvertime = reader.bool();
                            break;
                        }
                    case 11: {
                            message.totalDrivingDistance = reader.int32();
                            break;
                        }
                    case 12: {
                            if (!(message.tasks && message.tasks.length))
                                message.tasks = [];
                            message.tasks.push($root.air20.output.AirTask.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AirRoute message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.AirRoute
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.AirRoute} AirRoute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirRoute.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AirRoute message.
             * @function verify
             * @memberof air20.output.AirRoute
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AirRoute.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    if (!$util.isInteger(message.startTime))
                        return "startTime: integer expected";
                if (message.endTime != null && message.hasOwnProperty("endTime"))
                    if (!$util.isInteger(message.endTime))
                        return "endTime: integer expected";
                if (message.totalDeliveryDemand != null && message.hasOwnProperty("totalDeliveryDemand"))
                    if (!$util.isInteger(message.totalDeliveryDemand) && !(message.totalDeliveryDemand && $util.isInteger(message.totalDeliveryDemand.low) && $util.isInteger(message.totalDeliveryDemand.high)))
                        return "totalDeliveryDemand: integer|Long expected";
                if (message.totalPickupDemand != null && message.hasOwnProperty("totalPickupDemand"))
                    if (!$util.isInteger(message.totalPickupDemand) && !(message.totalPickupDemand && $util.isInteger(message.totalPickupDemand.low) && $util.isInteger(message.totalPickupDemand.high)))
                        return "totalPickupDemand: integer|Long expected";
                if (message.totalDrivingTime != null && message.hasOwnProperty("totalDrivingTime"))
                    if (!$util.isInteger(message.totalDrivingTime))
                        return "totalDrivingTime: integer expected";
                if (message.totalSlackTime != null && message.hasOwnProperty("totalSlackTime"))
                    if (!$util.isInteger(message.totalSlackTime))
                        return "totalSlackTime: integer expected";
                if (message.totalServiceTime != null && message.hasOwnProperty("totalServiceTime"))
                    if (!$util.isInteger(message.totalServiceTime))
                        return "totalServiceTime: integer expected";
                if (message.totalWorkTime != null && message.hasOwnProperty("totalWorkTime"))
                    if (!$util.isInteger(message.totalWorkTime))
                        return "totalWorkTime: integer expected";
                if (message.isOvertime != null && message.hasOwnProperty("isOvertime"))
                    if (typeof message.isOvertime !== "boolean")
                        return "isOvertime: boolean expected";
                if (message.totalDrivingDistance != null && message.hasOwnProperty("totalDrivingDistance"))
                    if (!$util.isInteger(message.totalDrivingDistance))
                        return "totalDrivingDistance: integer expected";
                if (message.tasks != null && message.hasOwnProperty("tasks")) {
                    if (!Array.isArray(message.tasks))
                        return "tasks: array expected";
                    for (var i = 0; i < message.tasks.length; ++i) {
                        var error = $root.air20.output.AirTask.verify(message.tasks[i]);
                        if (error)
                            return "tasks." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an AirRoute message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.AirRoute
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.AirRoute} AirRoute
             */
            AirRoute.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.AirRoute)
                    return object;
                var message = new $root.air20.output.AirRoute();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.startTime != null)
                    message.startTime = object.startTime | 0;
                if (object.endTime != null)
                    message.endTime = object.endTime | 0;
                if (object.totalDeliveryDemand != null)
                    if ($util.Long)
                        (message.totalDeliveryDemand = $util.Long.fromValue(object.totalDeliveryDemand)).unsigned = false;
                    else if (typeof object.totalDeliveryDemand === "string")
                        message.totalDeliveryDemand = parseInt(object.totalDeliveryDemand, 10);
                    else if (typeof object.totalDeliveryDemand === "number")
                        message.totalDeliveryDemand = object.totalDeliveryDemand;
                    else if (typeof object.totalDeliveryDemand === "object")
                        message.totalDeliveryDemand = new $util.LongBits(object.totalDeliveryDemand.low >>> 0, object.totalDeliveryDemand.high >>> 0).toNumber();
                if (object.totalPickupDemand != null)
                    if ($util.Long)
                        (message.totalPickupDemand = $util.Long.fromValue(object.totalPickupDemand)).unsigned = false;
                    else if (typeof object.totalPickupDemand === "string")
                        message.totalPickupDemand = parseInt(object.totalPickupDemand, 10);
                    else if (typeof object.totalPickupDemand === "number")
                        message.totalPickupDemand = object.totalPickupDemand;
                    else if (typeof object.totalPickupDemand === "object")
                        message.totalPickupDemand = new $util.LongBits(object.totalPickupDemand.low >>> 0, object.totalPickupDemand.high >>> 0).toNumber();
                if (object.totalDrivingTime != null)
                    message.totalDrivingTime = object.totalDrivingTime | 0;
                if (object.totalSlackTime != null)
                    message.totalSlackTime = object.totalSlackTime | 0;
                if (object.totalServiceTime != null)
                    message.totalServiceTime = object.totalServiceTime | 0;
                if (object.totalWorkTime != null)
                    message.totalWorkTime = object.totalWorkTime | 0;
                if (object.isOvertime != null)
                    message.isOvertime = Boolean(object.isOvertime);
                if (object.totalDrivingDistance != null)
                    message.totalDrivingDistance = object.totalDrivingDistance | 0;
                if (object.tasks) {
                    if (!Array.isArray(object.tasks))
                        throw TypeError(".air20.output.AirRoute.tasks: array expected");
                    message.tasks = [];
                    for (var i = 0; i < object.tasks.length; ++i) {
                        if (typeof object.tasks[i] !== "object")
                            throw TypeError(".air20.output.AirRoute.tasks: object expected");
                        message.tasks[i] = $root.air20.output.AirTask.fromObject(object.tasks[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an AirRoute message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.AirRoute
             * @static
             * @param {air20.output.AirRoute} message AirRoute
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AirRoute.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.tasks = [];
                if (options.defaults) {
                    object.id = "";
                    object.startTime = 0;
                    object.endTime = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.totalDeliveryDemand = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.totalDeliveryDemand = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.totalPickupDemand = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.totalPickupDemand = options.longs === String ? "0" : 0;
                    object.totalDrivingTime = 0;
                    object.totalSlackTime = 0;
                    object.totalServiceTime = 0;
                    object.totalWorkTime = 0;
                    object.isOvertime = false;
                    object.totalDrivingDistance = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.startTime != null && message.hasOwnProperty("startTime"))
                    object.startTime = message.startTime;
                if (message.endTime != null && message.hasOwnProperty("endTime"))
                    object.endTime = message.endTime;
                if (message.totalDeliveryDemand != null && message.hasOwnProperty("totalDeliveryDemand"))
                    if (typeof message.totalDeliveryDemand === "number")
                        object.totalDeliveryDemand = options.longs === String ? String(message.totalDeliveryDemand) : message.totalDeliveryDemand;
                    else
                        object.totalDeliveryDemand = options.longs === String ? $util.Long.prototype.toString.call(message.totalDeliveryDemand) : options.longs === Number ? new $util.LongBits(message.totalDeliveryDemand.low >>> 0, message.totalDeliveryDemand.high >>> 0).toNumber() : message.totalDeliveryDemand;
                if (message.totalPickupDemand != null && message.hasOwnProperty("totalPickupDemand"))
                    if (typeof message.totalPickupDemand === "number")
                        object.totalPickupDemand = options.longs === String ? String(message.totalPickupDemand) : message.totalPickupDemand;
                    else
                        object.totalPickupDemand = options.longs === String ? $util.Long.prototype.toString.call(message.totalPickupDemand) : options.longs === Number ? new $util.LongBits(message.totalPickupDemand.low >>> 0, message.totalPickupDemand.high >>> 0).toNumber() : message.totalPickupDemand;
                if (message.totalDrivingTime != null && message.hasOwnProperty("totalDrivingTime"))
                    object.totalDrivingTime = message.totalDrivingTime;
                if (message.totalSlackTime != null && message.hasOwnProperty("totalSlackTime"))
                    object.totalSlackTime = message.totalSlackTime;
                if (message.totalServiceTime != null && message.hasOwnProperty("totalServiceTime"))
                    object.totalServiceTime = message.totalServiceTime;
                if (message.totalWorkTime != null && message.hasOwnProperty("totalWorkTime"))
                    object.totalWorkTime = message.totalWorkTime;
                if (message.isOvertime != null && message.hasOwnProperty("isOvertime"))
                    object.isOvertime = message.isOvertime;
                if (message.totalDrivingDistance != null && message.hasOwnProperty("totalDrivingDistance"))
                    object.totalDrivingDistance = message.totalDrivingDistance;
                if (message.tasks && message.tasks.length) {
                    object.tasks = [];
                    for (var j = 0; j < message.tasks.length; ++j)
                        object.tasks[j] = $root.air20.output.AirTask.toObject(message.tasks[j], options);
                }
                return object;
            };

            /**
             * Converts this AirRoute to JSON.
             * @function toJSON
             * @memberof air20.output.AirRoute
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AirRoute.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AirRoute
             * @function getTypeUrl
             * @memberof air20.output.AirRoute
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AirRoute.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.AirRoute";
            };

            return AirRoute;
        })();

        output.AirTask = (function() {

            /**
             * Properties of an AirTask.
             * @memberof air20.output
             * @interface IAirTask
             * @property {number|null} [seq] AirTask seq
             * @property {string|null} [refId] AirTask refId
             * @property {string|null} [location] AirTask location
             * @property {string|null} [event] AirTask event
             * @property {number|null} [type] AirTask type
             * @property {number|null} [transitDistance] AirTask transitDistance
             * @property {number|null} [transitTime] AirTask transitTime
             * @property {number|null} [arrivalTime] AirTask arrivalTime
             * @property {number|Long|null} [arrivalCapacity] AirTask arrivalCapacity
             * @property {number|null} [serviceTime] AirTask serviceTime
             * @property {number|null} [slackTime] AirTask slackTime
             * @property {Array.<air20.output.IDemand>|null} [demand] AirTask demand
             */

            /**
             * Constructs a new AirTask.
             * @memberof air20.output
             * @classdesc Represents an AirTask.
             * @implements IAirTask
             * @constructor
             * @param {air20.output.IAirTask=} [properties] Properties to set
             */
            function AirTask(properties) {
                this.demand = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AirTask seq.
             * @member {number} seq
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.seq = 0;

            /**
             * AirTask refId.
             * @member {string} refId
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.refId = "";

            /**
             * AirTask location.
             * @member {string} location
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.location = "";

            /**
             * AirTask event.
             * @member {string} event
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.event = "";

            /**
             * AirTask type.
             * @member {number} type
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.type = 0;

            /**
             * AirTask transitDistance.
             * @member {number} transitDistance
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.transitDistance = 0;

            /**
             * AirTask transitTime.
             * @member {number} transitTime
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.transitTime = 0;

            /**
             * AirTask arrivalTime.
             * @member {number} arrivalTime
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.arrivalTime = 0;

            /**
             * AirTask arrivalCapacity.
             * @member {number|Long} arrivalCapacity
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.arrivalCapacity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AirTask serviceTime.
             * @member {number} serviceTime
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.serviceTime = 0;

            /**
             * AirTask slackTime.
             * @member {number} slackTime
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.slackTime = 0;

            /**
             * AirTask demand.
             * @member {Array.<air20.output.IDemand>} demand
             * @memberof air20.output.AirTask
             * @instance
             */
            AirTask.prototype.demand = $util.emptyArray;

            /**
             * Creates a new AirTask instance using the specified properties.
             * @function create
             * @memberof air20.output.AirTask
             * @static
             * @param {air20.output.IAirTask=} [properties] Properties to set
             * @returns {air20.output.AirTask} AirTask instance
             */
            AirTask.create = function create(properties) {
                return new AirTask(properties);
            };

            /**
             * Encodes the specified AirTask message. Does not implicitly {@link air20.output.AirTask.verify|verify} messages.
             * @function encode
             * @memberof air20.output.AirTask
             * @static
             * @param {air20.output.IAirTask} message AirTask message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirTask.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seq != null && Object.hasOwnProperty.call(message, "seq"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seq);
                if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.refId);
                if (message.location != null && Object.hasOwnProperty.call(message, "location"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.location);
                if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.event);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.type);
                if (message.transitDistance != null && Object.hasOwnProperty.call(message, "transitDistance"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.transitDistance);
                if (message.transitTime != null && Object.hasOwnProperty.call(message, "transitTime"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.transitTime);
                if (message.arrivalTime != null && Object.hasOwnProperty.call(message, "arrivalTime"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.arrivalTime);
                if (message.arrivalCapacity != null && Object.hasOwnProperty.call(message, "arrivalCapacity"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int64(message.arrivalCapacity);
                if (message.serviceTime != null && Object.hasOwnProperty.call(message, "serviceTime"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.serviceTime);
                if (message.slackTime != null && Object.hasOwnProperty.call(message, "slackTime"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.slackTime);
                if (message.demand != null && message.demand.length)
                    for (var i = 0; i < message.demand.length; ++i)
                        $root.air20.output.Demand.encode(message.demand[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AirTask message, length delimited. Does not implicitly {@link air20.output.AirTask.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.AirTask
             * @static
             * @param {air20.output.IAirTask} message AirTask message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AirTask.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AirTask message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.AirTask
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.AirTask} AirTask
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirTask.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.AirTask();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seq = reader.int32();
                            break;
                        }
                    case 2: {
                            message.refId = reader.string();
                            break;
                        }
                    case 3: {
                            message.location = reader.string();
                            break;
                        }
                    case 4: {
                            message.event = reader.string();
                            break;
                        }
                    case 5: {
                            message.type = reader.int32();
                            break;
                        }
                    case 6: {
                            message.transitDistance = reader.int32();
                            break;
                        }
                    case 7: {
                            message.transitTime = reader.int32();
                            break;
                        }
                    case 8: {
                            message.arrivalTime = reader.int32();
                            break;
                        }
                    case 9: {
                            message.arrivalCapacity = reader.int64();
                            break;
                        }
                    case 10: {
                            message.serviceTime = reader.int32();
                            break;
                        }
                    case 11: {
                            message.slackTime = reader.int32();
                            break;
                        }
                    case 12: {
                            if (!(message.demand && message.demand.length))
                                message.demand = [];
                            message.demand.push($root.air20.output.Demand.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AirTask message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.AirTask
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.AirTask} AirTask
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AirTask.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AirTask message.
             * @function verify
             * @memberof air20.output.AirTask
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AirTask.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (!$util.isInteger(message.seq))
                        return "seq: integer expected";
                if (message.refId != null && message.hasOwnProperty("refId"))
                    if (!$util.isString(message.refId))
                        return "refId: string expected";
                if (message.location != null && message.hasOwnProperty("location"))
                    if (!$util.isString(message.location))
                        return "location: string expected";
                if (message.event != null && message.hasOwnProperty("event"))
                    if (!$util.isString(message.event))
                        return "event: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isInteger(message.type))
                        return "type: integer expected";
                if (message.transitDistance != null && message.hasOwnProperty("transitDistance"))
                    if (!$util.isInteger(message.transitDistance))
                        return "transitDistance: integer expected";
                if (message.transitTime != null && message.hasOwnProperty("transitTime"))
                    if (!$util.isInteger(message.transitTime))
                        return "transitTime: integer expected";
                if (message.arrivalTime != null && message.hasOwnProperty("arrivalTime"))
                    if (!$util.isInteger(message.arrivalTime))
                        return "arrivalTime: integer expected";
                if (message.arrivalCapacity != null && message.hasOwnProperty("arrivalCapacity"))
                    if (!$util.isInteger(message.arrivalCapacity) && !(message.arrivalCapacity && $util.isInteger(message.arrivalCapacity.low) && $util.isInteger(message.arrivalCapacity.high)))
                        return "arrivalCapacity: integer|Long expected";
                if (message.serviceTime != null && message.hasOwnProperty("serviceTime"))
                    if (!$util.isInteger(message.serviceTime))
                        return "serviceTime: integer expected";
                if (message.slackTime != null && message.hasOwnProperty("slackTime"))
                    if (!$util.isInteger(message.slackTime))
                        return "slackTime: integer expected";
                if (message.demand != null && message.hasOwnProperty("demand")) {
                    if (!Array.isArray(message.demand))
                        return "demand: array expected";
                    for (var i = 0; i < message.demand.length; ++i) {
                        var error = $root.air20.output.Demand.verify(message.demand[i]);
                        if (error)
                            return "demand." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an AirTask message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.AirTask
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.AirTask} AirTask
             */
            AirTask.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.AirTask)
                    return object;
                var message = new $root.air20.output.AirTask();
                if (object.seq != null)
                    message.seq = object.seq | 0;
                if (object.refId != null)
                    message.refId = String(object.refId);
                if (object.location != null)
                    message.location = String(object.location);
                if (object.event != null)
                    message.event = String(object.event);
                if (object.type != null)
                    message.type = object.type | 0;
                if (object.transitDistance != null)
                    message.transitDistance = object.transitDistance | 0;
                if (object.transitTime != null)
                    message.transitTime = object.transitTime | 0;
                if (object.arrivalTime != null)
                    message.arrivalTime = object.arrivalTime | 0;
                if (object.arrivalCapacity != null)
                    if ($util.Long)
                        (message.arrivalCapacity = $util.Long.fromValue(object.arrivalCapacity)).unsigned = false;
                    else if (typeof object.arrivalCapacity === "string")
                        message.arrivalCapacity = parseInt(object.arrivalCapacity, 10);
                    else if (typeof object.arrivalCapacity === "number")
                        message.arrivalCapacity = object.arrivalCapacity;
                    else if (typeof object.arrivalCapacity === "object")
                        message.arrivalCapacity = new $util.LongBits(object.arrivalCapacity.low >>> 0, object.arrivalCapacity.high >>> 0).toNumber();
                if (object.serviceTime != null)
                    message.serviceTime = object.serviceTime | 0;
                if (object.slackTime != null)
                    message.slackTime = object.slackTime | 0;
                if (object.demand) {
                    if (!Array.isArray(object.demand))
                        throw TypeError(".air20.output.AirTask.demand: array expected");
                    message.demand = [];
                    for (var i = 0; i < object.demand.length; ++i) {
                        if (typeof object.demand[i] !== "object")
                            throw TypeError(".air20.output.AirTask.demand: object expected");
                        message.demand[i] = $root.air20.output.Demand.fromObject(object.demand[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an AirTask message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.AirTask
             * @static
             * @param {air20.output.AirTask} message AirTask
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AirTask.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.demand = [];
                if (options.defaults) {
                    object.seq = 0;
                    object.refId = "";
                    object.location = "";
                    object.event = "";
                    object.type = 0;
                    object.transitDistance = 0;
                    object.transitTime = 0;
                    object.arrivalTime = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.arrivalCapacity = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.arrivalCapacity = options.longs === String ? "0" : 0;
                    object.serviceTime = 0;
                    object.slackTime = 0;
                }
                if (message.seq != null && message.hasOwnProperty("seq"))
                    object.seq = message.seq;
                if (message.refId != null && message.hasOwnProperty("refId"))
                    object.refId = message.refId;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = message.location;
                if (message.event != null && message.hasOwnProperty("event"))
                    object.event = message.event;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.transitDistance != null && message.hasOwnProperty("transitDistance"))
                    object.transitDistance = message.transitDistance;
                if (message.transitTime != null && message.hasOwnProperty("transitTime"))
                    object.transitTime = message.transitTime;
                if (message.arrivalTime != null && message.hasOwnProperty("arrivalTime"))
                    object.arrivalTime = message.arrivalTime;
                if (message.arrivalCapacity != null && message.hasOwnProperty("arrivalCapacity"))
                    if (typeof message.arrivalCapacity === "number")
                        object.arrivalCapacity = options.longs === String ? String(message.arrivalCapacity) : message.arrivalCapacity;
                    else
                        object.arrivalCapacity = options.longs === String ? $util.Long.prototype.toString.call(message.arrivalCapacity) : options.longs === Number ? new $util.LongBits(message.arrivalCapacity.low >>> 0, message.arrivalCapacity.high >>> 0).toNumber() : message.arrivalCapacity;
                if (message.serviceTime != null && message.hasOwnProperty("serviceTime"))
                    object.serviceTime = message.serviceTime;
                if (message.slackTime != null && message.hasOwnProperty("slackTime"))
                    object.slackTime = message.slackTime;
                if (message.demand && message.demand.length) {
                    object.demand = [];
                    for (var j = 0; j < message.demand.length; ++j)
                        object.demand[j] = $root.air20.output.Demand.toObject(message.demand[j], options);
                }
                return object;
            };

            /**
             * Converts this AirTask to JSON.
             * @function toJSON
             * @memberof air20.output.AirTask
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AirTask.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AirTask
             * @function getTypeUrl
             * @memberof air20.output.AirTask
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AirTask.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.AirTask";
            };

            return AirTask;
        })();

        output.Demand = (function() {

            /**
             * Properties of a Demand.
             * @memberof air20.output
             * @interface IDemand
             * @property {string|null} [type] Demand type
             * @property {number|Long|null} [quantity] Demand quantity
             * @property {Object.<string,string>|null} [info] Demand info
             */

            /**
             * Constructs a new Demand.
             * @memberof air20.output
             * @classdesc Represents a Demand.
             * @implements IDemand
             * @constructor
             * @param {air20.output.IDemand=} [properties] Properties to set
             */
            function Demand(properties) {
                this.info = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Demand type.
             * @member {string} type
             * @memberof air20.output.Demand
             * @instance
             */
            Demand.prototype.type = "";

            /**
             * Demand quantity.
             * @member {number|Long} quantity
             * @memberof air20.output.Demand
             * @instance
             */
            Demand.prototype.quantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Demand info.
             * @member {Object.<string,string>} info
             * @memberof air20.output.Demand
             * @instance
             */
            Demand.prototype.info = $util.emptyObject;

            /**
             * Creates a new Demand instance using the specified properties.
             * @function create
             * @memberof air20.output.Demand
             * @static
             * @param {air20.output.IDemand=} [properties] Properties to set
             * @returns {air20.output.Demand} Demand instance
             */
            Demand.create = function create(properties) {
                return new Demand(properties);
            };

            /**
             * Encodes the specified Demand message. Does not implicitly {@link air20.output.Demand.verify|verify} messages.
             * @function encode
             * @memberof air20.output.Demand
             * @static
             * @param {air20.output.IDemand} message Demand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Demand.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
                if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.quantity);
                if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                    for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.info[keys[i]]).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Demand message, length delimited. Does not implicitly {@link air20.output.Demand.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.Demand
             * @static
             * @param {air20.output.IDemand} message Demand message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Demand.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Demand message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.Demand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.Demand} Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Demand.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.Demand(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.string();
                            break;
                        }
                    case 2: {
                            message.quantity = reader.int64();
                            break;
                        }
                    case 3: {
                            if (message.info === $util.emptyObject)
                                message.info = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = "";
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = reader.string();
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.info[key] = value;
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Demand message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.Demand
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.Demand} Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Demand.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Demand message.
             * @function verify
             * @memberof air20.output.Demand
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Demand.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.quantity != null && message.hasOwnProperty("quantity"))
                    if (!$util.isInteger(message.quantity) && !(message.quantity && $util.isInteger(message.quantity.low) && $util.isInteger(message.quantity.high)))
                        return "quantity: integer|Long expected";
                if (message.info != null && message.hasOwnProperty("info")) {
                    if (!$util.isObject(message.info))
                        return "info: object expected";
                    var key = Object.keys(message.info);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.info[key[i]]))
                            return "info: string{k:string} expected";
                }
                return null;
            };

            /**
             * Creates a Demand message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.Demand
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.Demand} Demand
             */
            Demand.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.Demand)
                    return object;
                var message = new $root.air20.output.Demand();
                if (object.type != null)
                    message.type = String(object.type);
                if (object.quantity != null)
                    if ($util.Long)
                        (message.quantity = $util.Long.fromValue(object.quantity)).unsigned = false;
                    else if (typeof object.quantity === "string")
                        message.quantity = parseInt(object.quantity, 10);
                    else if (typeof object.quantity === "number")
                        message.quantity = object.quantity;
                    else if (typeof object.quantity === "object")
                        message.quantity = new $util.LongBits(object.quantity.low >>> 0, object.quantity.high >>> 0).toNumber();
                if (object.info) {
                    if (typeof object.info !== "object")
                        throw TypeError(".air20.output.Demand.info: object expected");
                    message.info = {};
                    for (var keys = Object.keys(object.info), i = 0; i < keys.length; ++i)
                        message.info[keys[i]] = String(object.info[keys[i]]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Demand message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.Demand
             * @static
             * @param {air20.output.Demand} message Demand
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Demand.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.info = {};
                if (options.defaults) {
                    object.type = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.quantity = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.quantity = options.longs === String ? "0" : 0;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.quantity != null && message.hasOwnProperty("quantity"))
                    if (typeof message.quantity === "number")
                        object.quantity = options.longs === String ? String(message.quantity) : message.quantity;
                    else
                        object.quantity = options.longs === String ? $util.Long.prototype.toString.call(message.quantity) : options.longs === Number ? new $util.LongBits(message.quantity.low >>> 0, message.quantity.high >>> 0).toNumber() : message.quantity;
                var keys2;
                if (message.info && (keys2 = Object.keys(message.info)).length) {
                    object.info = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.info[keys2[j]] = message.info[keys2[j]];
                }
                return object;
            };

            /**
             * Converts this Demand to JSON.
             * @function toJSON
             * @memberof air20.output.Demand
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Demand.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Demand
             * @function getTypeUrl
             * @memberof air20.output.Demand
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Demand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.Demand";
            };

            return Demand;
        })();

        output.Module = (function() {

            /**
             * Properties of a Module.
             * @memberof air20.output
             * @interface IModule
             * @property {string|null} [code] Module code
             * @property {string|null} [name] Module name
             * @property {string|null} [version] Module version
             */

            /**
             * Constructs a new Module.
             * @memberof air20.output
             * @classdesc Represents a Module.
             * @implements IModule
             * @constructor
             * @param {air20.output.IModule=} [properties] Properties to set
             */
            function Module(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Module code.
             * @member {string} code
             * @memberof air20.output.Module
             * @instance
             */
            Module.prototype.code = "";

            /**
             * Module name.
             * @member {string} name
             * @memberof air20.output.Module
             * @instance
             */
            Module.prototype.name = "";

            /**
             * Module version.
             * @member {string} version
             * @memberof air20.output.Module
             * @instance
             */
            Module.prototype.version = "";

            /**
             * Creates a new Module instance using the specified properties.
             * @function create
             * @memberof air20.output.Module
             * @static
             * @param {air20.output.IModule=} [properties] Properties to set
             * @returns {air20.output.Module} Module instance
             */
            Module.create = function create(properties) {
                return new Module(properties);
            };

            /**
             * Encodes the specified Module message. Does not implicitly {@link air20.output.Module.verify|verify} messages.
             * @function encode
             * @memberof air20.output.Module
             * @static
             * @param {air20.output.IModule} message Module message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Module.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
                return writer;
            };

            /**
             * Encodes the specified Module message, length delimited. Does not implicitly {@link air20.output.Module.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.Module
             * @static
             * @param {air20.output.IModule} message Module message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Module.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Module message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.Module
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.Module} Module
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Module.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.Module();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.code = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.version = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Module message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.Module
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.Module} Module
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Module.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Module message.
             * @function verify
             * @memberof air20.output.Module
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Module.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isString(message.code))
                        return "code: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                return null;
            };

            /**
             * Creates a Module message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.Module
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.Module} Module
             */
            Module.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.Module)
                    return object;
                var message = new $root.air20.output.Module();
                if (object.code != null)
                    message.code = String(object.code);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.version != null)
                    message.version = String(object.version);
                return message;
            };

            /**
             * Creates a plain object from a Module message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.Module
             * @static
             * @param {air20.output.Module} message Module
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Module.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.code = "";
                    object.name = "";
                    object.version = "";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                return object;
            };

            /**
             * Converts this Module to JSON.
             * @function toJSON
             * @memberof air20.output.Module
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Module.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Module
             * @function getTypeUrl
             * @memberof air20.output.Module
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Module.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.Module";
            };

            return Module;
        })();

        output.Error = (function() {

            /**
             * Properties of an Error.
             * @memberof air20.output
             * @interface IError
             * @property {string|null} [code] Error code
             * @property {string|null} [type] Error type
             * @property {string|null} [name] Error name
             * @property {string|null} [message] Error message
             */

            /**
             * Constructs a new Error.
             * @memberof air20.output
             * @classdesc Represents an Error.
             * @implements IError
             * @constructor
             * @param {air20.output.IError=} [properties] Properties to set
             */
            function Error(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Error code.
             * @member {string} code
             * @memberof air20.output.Error
             * @instance
             */
            Error.prototype.code = "";

            /**
             * Error type.
             * @member {string} type
             * @memberof air20.output.Error
             * @instance
             */
            Error.prototype.type = "";

            /**
             * Error name.
             * @member {string} name
             * @memberof air20.output.Error
             * @instance
             */
            Error.prototype.name = "";

            /**
             * Error message.
             * @member {string} message
             * @memberof air20.output.Error
             * @instance
             */
            Error.prototype.message = "";

            /**
             * Creates a new Error instance using the specified properties.
             * @function create
             * @memberof air20.output.Error
             * @static
             * @param {air20.output.IError=} [properties] Properties to set
             * @returns {air20.output.Error} Error instance
             */
            Error.create = function create(properties) {
                return new Error(properties);
            };

            /**
             * Encodes the specified Error message. Does not implicitly {@link air20.output.Error.verify|verify} messages.
             * @function encode
             * @memberof air20.output.Error
             * @static
             * @param {air20.output.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.message);
                return writer;
            };

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link air20.output.Error.verify|verify} messages.
             * @function encodeDelimited
             * @memberof air20.output.Error
             * @static
             * @param {air20.output.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @function decode
             * @memberof air20.output.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {air20.output.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.air20.output.Error();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.code = reader.string();
                            break;
                        }
                    case 2: {
                            message.type = reader.string();
                            break;
                        }
                    case 3: {
                            message.name = reader.string();
                            break;
                        }
                    case 4: {
                            message.message = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof air20.output.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {air20.output.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Error message.
             * @function verify
             * @memberof air20.output.Error
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Error.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isString(message.code))
                        return "code: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                return null;
            };

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof air20.output.Error
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {air20.output.Error} Error
             */
            Error.fromObject = function fromObject(object) {
                if (object instanceof $root.air20.output.Error)
                    return object;
                var message = new $root.air20.output.Error();
                if (object.code != null)
                    message.code = String(object.code);
                if (object.type != null)
                    message.type = String(object.type);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.message != null)
                    message.message = String(object.message);
                return message;
            };

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @function toObject
             * @memberof air20.output.Error
             * @static
             * @param {air20.output.Error} message Error
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Error.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.code = "";
                    object.type = "";
                    object.name = "";
                    object.message = "";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                return object;
            };

            /**
             * Converts this Error to JSON.
             * @function toJSON
             * @memberof air20.output.Error
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Error.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Error
             * @function getTypeUrl
             * @memberof air20.output.Error
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Error.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/air20.output.Error";
            };

            return Error;
        })();

        return output;
    })();

    return air20;
})();

module.exports = $root;
